import { ChatTemplates } from "./chatTemplates.js";
import { BotService } from "./botService.js";
import { Processes } from "./process.js";
import { Endpoints } from "./endpoints.js";
import { Templates } from "./Templates.js";
import { runProcessFlow } from "./runProcessFlow.js";

// Chat Storage
export const chatStorage = {
  messages: [],
  firstMessageSent: false,
  save() {
    const data = {
      messages: this.messages,
      timestamp: new Date().toISOString(),
    };
    this.savedChats = this.savedChats || [];
    this.savedChats.push(data);
  },
  load() {
    return this.messages;
  },
  addMessage(type, text) {
    this.messages.push({
      type,
      text,
      timestamp: new Date().toISOString(),
    });
  },
};

// DOM Elements
const chatAvatar = document.getElementById("chatAvatar");
const chatContainer = document.getElementById("chatContainer");
const closeBtn = document.getElementById("closeBtn");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messagesContainer");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const bottomSheet = document.getElementById("bottomSheet");
const bottomSheetOverlay = document.getElementById("bottomSheetOverlay");
const sheetCloseBtn = document.getElementById("sheetCloseBtn");
const micBtn = document.getElementById("micBtn"); // NEW: Voice button element
const systemMessage = document.getElementById("systemMessage"); // NEW: System message box

localStorage.clear();
localStorage.setItem("mute", "false");

// Typing Indicator HTML Template
const TYPING_INDICATOR_HTML = ChatTemplates.chatIndicator();

// --- Core Functions ---

// Function to display temporary system messages (replaces alert())
function showSystemMessage(message, color) {
  systemMessage.textContent = message;
  // Helper function to safely get CSS variables
  const var_get = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name);
  systemMessage.style.backgroundColor =
    color === "accent-blue"
      ? var_get("--accent-blue")
      : var_get("--accent-red");
  systemMessage.classList.add("visible");
  setTimeout(hideSystemMessage, 4000);
}
function hideSystemMessage() {
  systemMessage.classList.remove("visible");
}

// --- Text-to-Speech Setup (UPDATED to use Male Voice and Rate 0.8) ---
function speakMessage(texthtml) {
  if (localStorage.getItem("mute") === "true") return;
  let text = texthtml.replace(/(<([^>]+)>)/gi, "");
  text = text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
    ""
  );

  //   console.log(text);

  if ("speechSynthesis" in window) {
    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Set rate to 0.8 as requested by the user
    utterance.rate = 1.1;
    utterance.pitch = 1.0;

    const setAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      // console.log("Available voices:", voices);
      if (voices.length > 0) {
        const maleKeywords = [
          "Alice",
          "david",
          "google us english",
          "microsoft",
        ];

        // 1. Search for a preferred English male voice using keywords (case-insensitive)
        // const preferredVoice = voices.find(voice =>
        //     // Check for English locale (en-)
        //     voice.lang.startsWith('en') &&
        //     // Check for common male keywords/names
        //     maleKeywords.some(keyword => voice.name.toLowerCase().includes(keyword))
        // );

        // 2. Fallback: Find the first English voice
        // const fallbackVoice = voices.find(voice => voice.lang.startsWith('en'));
        const fallbackVoice = voices[117]; //-- male
        //const fallbackVoice = voices[187]; // -- female
        // console.log("fallbackVoice Voice:", fallbackVoice);

        // 3. Set the voice: Preferred Male > English Fallback > Default (first voice)
        utterance.voice = fallbackVoice || voices[187];
      }
      window.speechSynthesis.speak(utterance);
    };

    // Check if voices are already loaded (async step)
    if (window.speechSynthesis.getVoices().length > 0) {
      setAndSpeak();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = setAndSpeak;
    }
  } else {
    console.warn("Text-to-Speech not supported in this browser.");
    // Only show message if the chat window is actually open
    if (chatContainer.classList.contains("active")) {
      showSystemMessage(
        "Text-to-Speech is not available in your browser.",
        "accent-red"
      );
    }
  }
}
// --- End Text-to-Speech Setup ---

// --- Speech-to-Text Setup ---
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecording = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false; // Capture a single phrase
  recognition.lang = "en-IN"; // Using en-IN as requested in prior version

  recognition.onstart = () => {
    // Cancel TTS if currently speaking
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    isRecording = true;
    micBtn.classList.add("recording");
    micBtn.innerHTML = '<i class="fa-solid fa-stop"></i>'; // Change icon to stop
    messageInput.placeholder = "Speak now...";
    showSystemMessage(
      "Listening... Tap the red button to stop.",
      "accent-blue"
    );
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    // Append to existing text if any
    const currentText = messageInput.value.trim();
    messageInput.value = currentText
      ? currentText + " " + transcript
      : transcript;
    messageInput.focus();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    if (event.error === "no-speech") {
      showSystemMessage("No speech detected. Try again.", "accent-red");
    } else if (event.error === "not-allowed") {
      showSystemMessage(
        "Microphone access denied. Please grant permission in your browser settings.",
        "accent-red"
      );
    } else if (event.error === "network") {
      showSystemMessage(
        "Network issue: Could not connect to the speech service. Check your internet connection.",
        "accent-red"
      );
    } else {
      showSystemMessage(`Error: ${event.error}`, "accent-red");
    }
  };

  recognition.onend = () => {
    isRecording = false;
    micBtn.classList.remove("recording");
    micBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>'; // Change icon back to mic
    messageInput.placeholder = "Type your question here...";
    hideSystemMessage();

    // Automatically send the message if text was captured
    const capturedText = messageInput.value.trim();
    if (capturedText) {
      // You can uncomment the line below if you want messages to send automatically upon speech recognition completion
      // sendMessage(capturedText);
    }
  };
} else {
  // Hide the voice button if API is not supported
  micBtn.classList.add("hidden");
}
// --- End Speech-to-Text Setup ---

// Helper function to get CSS variables (needed by showSystemMessage)
function var_get(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function createWelcomeSection() {
  const welcomeHTML = ChatTemplates.welcome();
  return welcomeHTML;
}

function renderMessages() {
  messagesContainer.innerHTML = "";
  if (!chatStorage.firstMessageSent) {
    // Display welcome section only before the first user message
    messagesContainer.innerHTML = createWelcomeSection();
  } else {
    // Display chat history
    chatStorage.messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", msg.type);
      const bubble = document.createElement("div");
      bubble.classList.add("message-bubble");
      // bubble.innerHTML = msg.text;
      bubble.innerHTML = normalizeBotHtml(msg.text);
      messageElement.appendChild(bubble);
      messagesContainer.appendChild(messageElement);
    });
  }
  scrollToBottom();
  // Re-attach listeners to dynamically created chips
  if (!chatStorage.firstMessageSent) {
    document.querySelectorAll("#welcomeChips .chip").forEach((chip) => {
      chip.addEventListener("click", handleChipClick);
    });
  }
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
  // Insert the HTML string directly into the messages container to place it correctly.
  messagesContainer.insertAdjacentHTML("beforeend", TYPING_INDICATOR_HTML);
  const indicator = document.getElementById("typingIndicator");
  if (indicator) {
    indicator.classList.add("active");
  }
  scrollToBottom();
}

function hideTypingIndicator() {
  const indicator = document.getElementById("typingIndicator");
  if (indicator) {
    // Remove the indicator element completely once typing is done.
    // It will be re-inserted on the next typing event.
    indicator.remove();
  }
}

async function simulateBotResponse(userMessage) {
  showTypingIndicator();

  let botResponse;
  let dummyBotResponse = "";
  const botService = new BotService();

  let processTitle, xendpoint, reqmethod, msgTemplate;

  // ----------------------------------------------------------------------
  // STEP 1: Check for an ACTIVE Process (Continuation Flow)
  // ----------------------------------------------------------------------
  const activeProcessTitle = window.localStorage.getItem("process");

  if (activeProcessTitle && activeProcessTitle !== "false") {
    let processResponse = await runProcessFlow(activeProcessTitle, userMessage);

    console.log("===>", processResponse);

    if (processResponse.processCompleted) {
      window.localStorage.setItem("process", "false");

      if (processResponse.type == "success") {
        chatStorage.addMessage("bot", processResponse.output);
        hideTypingIndicator();
        renderMessages();
        speakMessage(processResponse.output);

        //  Show typing indicator here
        showTypingIndicator();
        //---------------------------------------------------------------
        // STEP 1(a): Make call to Database for request
        // STEP 1(b):it also render result into suitable template
        makeDBcall(processResponse);
        // process completed here
        //--------------------------------------------------------------
      } else {
        //---------------------------------------------------------------
        // STEP 1(c): If ABort the process just render output of thanks
        //---------------------------------------------------------------
        chatStorage.addMessage("bot", processResponse.output);
        hideTypingIndicator();
        renderMessages();
        speakMessage(processResponse.output);
      }

      //reset all storage (except speaker mute) beacuse process is completed
      let prev = localStorage.getItem("mute");
      localStorage.clear();
      localStorage.setItem("mute", prev);

      return; // important: prevent immediate rendering
    }

    // Output the bot's response (next question or other reposnses)
    botResponse = processResponse.output;

    // Hide indicator and output response immediately
    hideTypingIndicator();
    chatStorage.addMessage("bot", botResponse);
    renderMessages();
    speakMessage(botResponse);

    // EXIT: Do not proceed to the API call/initialization logic
    return;
  }

  // ----------------------------------------------------------------------
  // STEP 2: No active process. Proceed with API call (Initialization)
  // ----------------------------------------------------------------------

  await botService
    .doApiCall(userMessage)
    .then((s) => {
      botResponse = normalizeBotHtml(s);
    })
    .catch((e) => {
      console.log(e);
      botResponse = "Something went wrong,Try after few seconds";
    })
    .finally(() => {
      // Hides the indicator before adding the message
      hideTypingIndicator();
    });

  // ----------------------------------------------------------------------
  // STEP 3: Handle API Response (Start Flow or Generic Response)
  // ----------------------------------------------------------------------
  try {
    botResponse = botResponse.trim();
    const processCount = Object.keys(Processes).length;
    // check whether return a process number
    if (!isNaN(Number(botResponse))) {
      if (Number(botResponse) > processCount - 1) {
        botResponse = "Sorry unable to process.";
      }
    }

    // if it is a valid service
    if (!isNaN(Number(botResponse))) {
      switch (Number(botResponse)) {
        case 0:
          processTitle = Processes.Pay_Slip.title;
          xendpoint = Endpoints.salary.payslip.url;
          reqmethod = Endpoints.salary.payslip.method;
          msgTemplate = Templates.payslipTemplate.id;
          break;
        case 1:
          processTitle = Processes.Leave_Balance.title;
          xendpoint = Endpoints.leave.balance.url;
          reqmethod = Endpoints.leave.balance.method;
          msgTemplate = Templates.leaveTemplate.id;
          break;
        case 2:
          processTitle = Processes.ACR_Grading.title;
          xendpoint = Endpoints.acr.grading.url;
          reqmethod = Endpoints.acr.grading.method;
          msgTemplate = Templates.leaveTemplate.id;
          break;
        case 3:
          processTitle = Processes.Profile_details.title;
          xendpoint = Endpoints.profile.details.url;
          reqmethod = Endpoints.profile.details.method;
          msgTemplate = Templates.profileTemplate.id;
          break;
        default:
      }

      // ----------------------------------------------------------------------
      // STEP 3(a): IT Starts the Dummy Bot Process
      // STEP 3(a): Set the process flag to the process name (e.g., 'Pay_Slip')
      // --IMPORTANT--
      // Set all api,method,template for dummy Bot
      // ----------------------------------------------------------------------

      // Start flow
      //
      window.localStorage.setItem("process", processTitle);
      window.localStorage.setItem("api", xendpoint);
      window.localStorage.setItem("method", reqmethod);
      window.localStorage.setItem("msgTemplate", msgTemplate);

      // Call flow function only once to get the first question
      dummyBotResponse = await runProcessFlow(processTitle, null);

      botResponse = dummyBotResponse.output; // The first question
    }

    // ----------------------------------------------------------------------
    // STEP 4: Output Final Response (Generic or First Question)
    // ----------------------------------------------------------------------

    console.log("dummyBotResponse", dummyBotResponse);
    chatStorage.addMessage("bot", botResponse);
    renderMessages();
    speakMessage(botResponse);
  } catch (error) {
    let msg =
      "Sorry, the service is temporarily unavailable. Our server is currently under maintenance. Please try again later.";
    console.error("Error in bot response handling:", error);
    // Fallback for errors in the logic block
    hideTypingIndicator();
    chatStorage.addMessage("bot", msg);
    renderMessages();
    speakMessage(msg);
  }
}

function normalizeBotHtml(html) {
  if (!html) return html;

  /* 1) Extract <img> inside <p> tags */
  html = html.replace(/<p[^>]*>\s*<img[^>]*>\s*<\/p>/gi, (block) => {
    const match = block.match(/<img[^>]*src=["']([^"']+)["']/i);
    return match ? `<img src="${match[1]}" alt="image" class="bot-image">` : "";
  });

  /* 2) Normalize all <img> tags */
  html = html.replace(
    /<img[^>]*src=["']([^"']+)["'][^>]*>/gi,
    (_, src) => `<img src="${src}" alt="image" class="bot-image">`
  );

  /* 3) Convert raw image URLs */
  html = html.replace(
    /(^|\s)(https?:\/\/[^\s'"]+\.(jpg|jpeg|png|gif|webp))(?=$|\s)/gi,
    (_, space, url) =>
      `${space}<img src="${url}" alt="image" class="bot-image">`
  );

  /* 4) FIX <a> TAGS WITHOUT href */
  html = html.replace(/<a\b([^>]*)>(.*?)<\/a>/gi, (full, attrs, text) => {
    // already has href → keep it
    if (/href\s*=/i.test(attrs)) return full;

    const urlMatch = text.match(/https?:\/\/[^\s<]+|www\.[^\s<]+/i);
    if (!urlMatch) return full;

    let url = urlMatch[0];
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    return `<a href="${url}" target="_blank" class="bot-link-btn">View / Download</a>`;
  });

  /* 5) Convert raw non-image URLs to link buttons */
  html = html.replace(
    /(^|\s)(https?:\/\/(?![^\s'"]+\.(jpg|jpeg|png|gif|webp))[^\s'"]+)(?=$|\s)/gi,
    (_, space, url) =>
      `${space}<a href="${url}" target="_blank" class="bot-link-btn">View / Download</a>`
  );

  return html;
}

function sendMessage(text) {
  text = text.trim();
  if (text === "") return;

  // 1. Stop any currently speaking TTS before sending a new message
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  // 2. Mark that the first message has been sent
  chatStorage.firstMessageSent = true;

  // 3. Add user message to state
  chatStorage.addMessage("user", text);
  // 4. Clear input
  messageInput.value = "";

  // 5. Re-render messages (this hides the welcome screen)
  renderMessages();
  scrollToBottom();

  // 6. Simulate bot response
  simulateBotResponse(text);
}

function handleChipClick(event) {
  const action = event.currentTarget.getAttribute("data-action");
  if (action) {
    sendMessage(action);
  }
}

function toggleBottomSheet(open) {
  if (open) {
    bottomSheet.classList.add("active");
    bottomSheetOverlay.classList.add("active");
  } else {
    bottomSheet.classList.remove("active");
    bottomSheetOverlay.classList.remove("active");
  }
}

// --- Event Listeners ---
// Chat Toggle
chatAvatar.addEventListener("click", () => toggleChat(true));
closeBtn.addEventListener("click", () => toggleChat(false));

// Input and Send
sendBtn.addEventListener("click", () => sendMessage(messageInput.value.trim()));
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage(messageInput.value.trim());
    e.preventDefault();
  }
});

// NEW: Voice Button Handler
micBtn.addEventListener("click", () => {
  if (!recognition) {
    showSystemMessage(
      "Speech Recognition is not supported by your browser.",
      "accent-red"
    );
    return;
  }

  if (isRecording) {
    recognition.stop();
  } else {
    // Clear input field before starting new recording
    messageInput.value = "";
    recognition.start();
  }
});

// Bottom Sheet Toggle
hamburgerBtn.addEventListener("click", () => toggleBottomSheet(true));
sheetCloseBtn.addEventListener("click", () => toggleBottomSheet(false));
bottomSheetOverlay.addEventListener("click", () => toggleBottomSheet(false));
// Menu Item Clicks (simulating sending a message)
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    const action = item.querySelector(".menu-item-label").textContent.trim();
    toggleBottomSheet(false); // Close menu
    // Use a slight delay to ensure menu closes before message sends
    setTimeout(() => sendMessage(`I need help with ${action}`), 100);
  });
});

// Initialize: Start with the chat closed
document.addEventListener("DOMContentLoaded", () => {
  toggleChat(false);
});

function toggleChat(open) {
  if (open) {
    chatContainer.classList.add("active");
    chatAvatar.classList.add("hidden");
    renderMessages(); // Render messages or welcome screen
  } else {
    chatContainer.classList.remove("active");
    chatAvatar.classList.remove("hidden");
  }
}

async function makeDBcall(processResponse) {
  let dbagent = new BotService();
  await dbagent
    .doDBApiCall(
      processResponse.xendpoint,
      processResponse.reqmethod,
      processResponse.params
    )
    .then((res) => {
      let dbresult = res;
      console.log("DB RESULT=>", dbresult);
      // get template
      const formattedHtml =
        Templates[processResponse.msgTemplate].format(dbresult);

      hideTypingIndicator();
      // Output the bot's response (final DB success reposnses)
      chatStorage.addMessage("bot", formattedHtml);
      renderMessages();
    })
    .catch((e) => {
      console.error("DB Exception=>", e);
      throw $e;
    });
}
