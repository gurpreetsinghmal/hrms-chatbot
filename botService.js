import { constants } from "./constants.js";
import { checkUserEncrptedAndFetch } from "./loggeduser.js";
import { PromptTemplates } from "./promptTemplates.js";
export class BotService {
  async doApiCall(userMessage) {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let user = {
      id: 1,
      firstName: "Emily",
      lastName: "Johnson",
      maidenName: "Smith",
      age: "29 years",
      gender: "female",
      email: "emily.johnson@x.dummyjson.com",
      phone: "+81 965-431-3024",
      username: "emilys",
      password: "emilyspass",
      birthDate: "30-05-1989",
      image:
        "https://www.gavinpublishers.com/admin/assets/editors_image/1508827486updated_picture1389863627.jpg",
      bloodGroup: "O-",
      height: "193.24",
      weight: "63.16",
      eyeColor: "Green",
      nicknames: ["john", "dave", "nick"],
    };
    let bodyContent = JSON.stringify(PromptTemplates(userMessage, user));

    // console.log("Request Body:", bodyContent);

    let SERVER_URL = constants.SERVER_URL;

    try {
      let response = await fetch(SERVER_URL, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.json();
      // console.log("Response Status:", data);
      // let jsondata = JSON.parse(data);
      return data;
    } catch (error) {
      throw error;
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
