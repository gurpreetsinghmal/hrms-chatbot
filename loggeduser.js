import { buildDynamicTable } from "./components/_buildDynamicTable.js";
import { constants } from "./constants.js";

export async function checkUserEncrptedAndFetch() {
  // 1. Check if 'loggeduser' exists in localStorage
  let loggedUser = sessionStorage.getItem("loggeduser");
  //loggedUser = "+4CwVtdV7kfu8VNgvYSPfg==";
  if (!loggedUser) {
    console.log("User not found in storage. Fetching data...");

    try {
      const response = await fetch(constants.SERVER_URL + `/encrypt-data`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Important: Tell server this is JSON
        },
        body: JSON.stringify({ empid: "123818" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const r = await response.json();
      console.log(r);
      if (r.status == "s") {
        sessionStorage.setItem("loggeduser", r.data[0].encryptdata);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  } else {
    console.log("User is already logged in. Encypt API call ignored.");
  }
}

await checkUserEncrptedAndFetch();
