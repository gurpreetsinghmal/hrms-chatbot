import { ChatTemplates } from "./chatTemplates.js";
import { BotService } from "./botService.js";
import { Processes } from "./process.js";
import { Endpoints } from "./endpoints.js";
import { Templates } from "./templates/leaveTemplate.js";
// Chat Storage
const chatStorage = {
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
const muteButton = document.getElementById("muteButton");
const unmuteButton = document.getElementById("unmuteButton");

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
    // console.log(userMessage, "========user message");
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
            chatStorage.addMessage("bot", formattedHtml);
            renderMessages();
          })
          .catch((e) => {
            console.error("DB Exception=>", e);
            throw $e;
          });
      } else {
        //if aborted
        chatStorage.addMessage("bot", processResponse.output);
        hideTypingIndicator();
        renderMessages();
        speakMessage(processResponse.output);
      }

      let prev = localStorage.getItem("mute");
      localStorage.clear();
      localStorage.setItem("mute", prev);

      return; // important: prevent immediate rendering
    }

    // Output the bot's response (next question or completion message)
    botResponse = processResponse.output;

    // Hide indicator and output response immediately
    hideTypingIndicator();
    chatStorage.addMessage("bot", botResponse);
    renderMessages();
    speakMessage(botResponse);

    if (processResponse.templateid != null) {
      chatStorage.addMessage("bot", processResponse.listContainer);
      renderMessages();
      //empty your template
      processResponse = null;
    }

    // EXIT: Do not proceed to the API call/initialization logic
    return;
  }

  // ----------------------------------------------------------------------
  // STEP 2: No active process. Proceed with API call (Initialization)
  // ----------------------------------------------------------------------

  // Only call the API if no process is currently active.
  // The conditional check `if (window.localStorage.getItem('process') !== 'true')`
  // is now handled by the check for `activeProcessTitle` above.

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
    // console.error(botResponse, "check 1");

    // **IMPORTANT CHANGE:** Set the process flag to the process name (e.g., 'Pay_Slip')
    // and only ask the FIRST question.
    botResponse = botResponse.trim();
    const processCount = Object.keys(Processes).length;
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
        default:
      }

      // Start flow
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

function loadProcessParams(processId) {
  const key = `process_params_${processId}`;
  const storedParams = sessionStorage.getItem(key);

  if (storedParams) {
    return JSON.parse(storedParams);
  } else {
    // Return a deep copy of the default parameters to avoid modifying the original 'Processes' template
    return JSON.parse(JSON.stringify(Processes[processId].params));
  }
}

/**
 * Saves the current parameters state for a process to sessionStorage.
 */
function saveProcessParams(processId, params) {
  const key = `process_params_${processId}`;
  sessionStorage.setItem(key, JSON.stringify(params));
}
function isParamsCompleted(params) {
  // Check if any value in the params object is still null.
  return Object.values(params).every((value) => value !== null);
}

async function runProcessFlow(processId, userMessage = null) {
  const process = Processes[processId];

  if (!process) {
    return { output: "Error: Invalid process ID.", processCompleted: true };
  }

  // 1. LOAD: Use the new helper to load the persistent state
  const params = loadProcessParams(processId);
  //console.log("load params", URLSearchParams);
  const paramKeys = Object.keys(params);

  // ----------------------------------------------------------------------
  // STEP 1: Process the last user message to fill the current missing param
  // ----------------------------------------------------------------------
  let wasUpdated = false;
  if (userMessage !== null) {
    let keyToUpdate = null;

    // Iterate backward to find the last parameter that is still null
    for (let i = 0; i < paramKeys.length; i++) {
      const key = paramKeys[i];
      if (params[key] === null) {
        keyToUpdate = key;
        break;
      }
    }

    if (keyToUpdate !== null) {
      if (
        keyToUpdate == "confirmation" &&
        userMessage.toUpperCase() !== "YES"
      ) {
        chatStorage.firstMessageSent = false;
        return {
          output: `Happy to help you soon. Please choose any services.`,
          processCompleted: true,
          type: "abort",
        };
      }
      // Update the parameter with the user's message
      params[keyToUpdate] = userMessage;
      wasUpdated = true;
      //console.log(`Parameter updated: ${keyToUpdate} = ${userMessage}`);
    }
  }

  // --- CRITICAL SAVE POINT ---
  // Save the state immediately if an update occurred or if this is the first run.
  if (wasUpdated || userMessage === null) {
    saveProcessParams(processId, params);
  }

  // ----------------------------------------------------------------------
  // STEP 2: Check status and determine the next action
  // ----------------------------------------------------------------------

  const currentMissingParamKey = getNextMissingParamKey(params);
  //   console.log(currentMissingParamKey, "current missing params");
  let response;

  if (isParamsCompleted(params)) {
    // All parameters filled.
    window.localStorage.setItem("process", "false");
    sessionStorage.removeItem(`process_params_${processId}`);

    let dbresult;
    let xendpoint = localStorage.getItem("api");
    let reqmethod = localStorage.getItem("method");
    let msgTemplate = localStorage.getItem("msgTemplate");

    response = {
      output: `Thank you we are preparing your data.`,
      xendpoint: xendpoint,
      reqmethod: reqmethod,
      params: params,
      msgTemplate: msgTemplate,
      processCompleted: true,
      type: "success",
    };
  } else if (currentMissingParamKey) {
    // Parameters still missing. Ask the next question.
    const nextQuestion = getQuestionForParam(processId, currentMissingParamKey);
    response = {
      output: nextQuestion,
      processCompleted: false,
    };
    // The state was already saved above. No need to save again here.
  }

  return response;
}

function getNextMissingParamKey(params) {
  //   console.log("getNextMissingParamKey", params);
  for (const key in params) {
    if (params[key] === null) {
      //   console.log("getNextMissingParamKey", "returning key", key);
      return key;
    }
  }

  //   console.log("getNextMissingParamKey", "returning null");
  return null; // All parameters are filled
}

function getQuestionForParam(processId, paramKey) {
  //   console.log("gettting question and logging param key", paramKey);
  const process = Processes[processId];
  const paramKeys = Object.keys(process.params);
  const index = paramKeys.indexOf(paramKey);

  if (index !== -1 && index < process.questions.length) {
    return process.questions[index];
  }
  return "Error: Could not find question for this parameter.";
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

muteButton.addEventListener("click", () => {
  if (window.localStorage.getItem("mute") == "true") {
    unmuteButton.style.display = "flex";
    muteButton.style.display = "none";
  }
  ToggleSpeaker();
});

unmuteButton.addEventListener("click", () => {
  if (window.localStorage.getItem("mute") == "false") {
    unmuteButton.style.display = "none";
    muteButton.style.display = "flex";
  }
  ToggleSpeaker();
});

function ToggleSpeaker() {
  let value = localStorage.getItem("mute");

  if (value == "true") {
    localStorage.setItem("mute", "false");
  } else {
    localStorage.setItem("mute", "true");
  }
}

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

const disclaimerBtn = document.getElementById("disclaimer");
const disclaimerOverlay = document.getElementById("disclaimerOverlay");
const disclaimerSheet = document.getElementById("disclaimerSheet");
const disclaimerCloseBtn = document.getElementById("disclaimerCloseBtn");

// Open Disclaimer Sheet
disclaimerBtn.addEventListener("click", () => {
  disclaimerOverlay.classList.add("active");
  disclaimerSheet.classList.add("active");
});

// Close Disclaimer Sheet
disclaimerCloseBtn.addEventListener("click", () => {
  disclaimerOverlay.classList.remove("active");
  disclaimerSheet.classList.remove("active");
});

// Also allow overlay click to close
disclaimerOverlay.addEventListener("click", () => {
  disclaimerOverlay.classList.remove("active");
  disclaimerSheet.classList.remove("active");
});
