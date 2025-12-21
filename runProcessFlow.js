import { chatStorage } from "./index.js";
import { Processes } from "./process.js";

export async function runProcessFlow(processId, userMessage = null) {
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
