import { constants } from "./constants.js";
import { checkUserEncrptedAndFetch } from "./loggeduser.js";
import { PromptTemplates } from "./promptTemplates.js";

function diagnoseQuery(query) {
  const text = query.toLowerCase().trim();

  const patterns = {
    GREETING:
      /\b(hi|hello|hey|hii|hai|good\s*(morning|afternoon|evening|night)|how\s*(are|r)\s*(you|u)|how\s*(r|are)\s*u|hru|hr\s*u|whats?\s*up|sup|how\s*is\s*it\s*going|how\s*do\s*you\s*do)\b/i,

    // Rules / policy related
    RULE: /\b(can\s*i|allowed|law(s)|permitted|polic(y|ies)|rule(s)?|criteria|eligible|limit(s)?|restriction(s)?|legal|forbidden|must|should\s*i)\b/i,

    // Process / how-to related
    PROCESS_FLOW:
      /\b(how\s*to|step(s)?|process(es)?|proced(ure|ures)|flow(s)?|guide(s)?|instruction(s)?|sequence(s)?|stage(s)?|next|way\s*to|get\s*started)\b/i,
  };

  let intents = [];
  if (patterns.GREETING.test(text)) intents.push("GREET");
  if (patterns.PROCESS_FLOW.test(text)) intents.push("PROCESS");
  if (patterns.RULE.test(text)) intents.push("RULE");

  return intents.length > 0 ? intents : ["API"];
}

const GREET_MSG = `Hello, I am Sewak Singh, an AI assistant designed to help you with iHRMS Punjab services. 
          I can assist you with services such as Leave Management, Pay Slip Generation, Employee Profile Management, 
          ACR Management, and other HR-related Services. How can I help you today?`;

export class BotService {
  async doVectorApiCall(userMessage) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    let SERVER_URL = constants.SERVER_URL;

    let bodyContent = JSON.stringify({ query: userMessage });

    try {
      let response = await fetch(SERVER_URL + "/search", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      if (data.length > 0) {
        if (data[0].id == "24") {
          return { type: "text", data: GREET_MSG };
        } else {
          console.log(data[0].id - 1);
          const apiid = data[0].id - 1;
          return {
            type: "text",
            data: `${apiid}`,
          };
        }
      } else {
        return await this.doLLMApiCall(userMessage);
      }
    } catch (error) {
      throw error;
    }
  }

  async doVectorRuleCall(userMessage) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    let SERVER_URL = constants.SERVER_URL;
    let model = localStorage.getItem("model") || "ollama";
    let bodyContent = JSON.stringify({ query: userMessage, model: model });

    try {
      let response = await fetch(SERVER_URL + "/search-rule", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      if (data.references.length > 0) {
        return { type: "docs", docs: data.references, data: data.response };
      } else if (data.response && data.response.length > 0) {
        return { type: "text", data: data.response };
      } else {
        localStorage.setItem("rule", "rule");
        return await this.doLLMApiCall(userMessage);
      }
    } catch (error) {
      throw error;
    }
  }

  async doVectorProcessCall(userMessage) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    let SERVER_URL = constants.SERVER_URL;

    let bodyContent = JSON.stringify({ query: userMessage });

    try {
      let response = await fetch(SERVER_URL + "/search-process", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      if (data.length > 0) {
        return {
          type: "text",
          data: `Query: ${data[0].question}<br>Solution : ${data[0].answer_eng}`,
        };
      } else {
        return { type: "text", data: "No Procedure Found" };
      }
    } catch (error) {
      throw error;
    }
  }

  async doLLMApiCall(userMessage) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(PromptTemplates(userMessage));

    let SERVER_URL = constants.SERVER_URL;

    try {
      let response = await fetch(SERVER_URL, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
      console.log("Response Status:", response);
      let data = response.json();
      // console.log("Response Status:", data.length);
      // let jsondata = JSON.parse(data);
      return { type: "text", data: data };
    } catch (error) {
      throw error;
    }
  }

  async doApiCall(userMessage) {
    const type = diagnoseQuery(userMessage);
    console.log("Diagnosed Query Type:", type);
    switch (type[0]) {
      case "GREET":
        return { type: "text", data: GREET_MSG };
      case "RULE":
        return await this.doVectorRuleCall(userMessage);
      case "PROCESS":
        return await this.doVectorProcessCall(userMessage);
      case "API":
        const model = localStorage.getItem("model") || "ollama";
        if (model == "gemini") {
          return await this.doLLMApiCall(userMessage);
        } else {
          return await this.doVectorApiCall(userMessage);
        }
      default:
        return { type: "text", data: "Unable to process this request." };
    }
  }

  async doDBApiCall(xendpoint, xmethod = "GET", xbody) {
    // check we have encypted userid if not then fetched
    checkUserEncrptedAndFetch();

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(xbody);

    // console.log("Request Body:", bodyContent);

    let SERVER_URL = constants.SERVER_URL + xendpoint;
    // let SERVER_URL = "http://localhost:3000";
    //adding user identity

    // Step 1: Convert string to Object
    let obj = JSON.parse(bodyContent);

    // Step 2: Add the new property
    obj.loggeduser = sessionStorage.getItem("loggeduser");

    // Step 3: Convert back to string (if needed)
    bodyContent = JSON.stringify(obj);

    try {
      let response;
      if (xmethod.toUpperCase() == "GET") {
        response = await fetch(SERVER_URL, {
          method: xmethod,
          headers: headersList,
        });
      } else {
        response = await fetch(SERVER_URL, {
          method: xmethod,
          body: bodyContent,
          headers: headersList,
        });
      }

      let rawdata = await response.json();
      console.log("Response Status:", rawdata);
      // let jsondata = JSON.parse(data);
      return rawdata;
    } catch (error) {
      throw error;
    }
  }
}
