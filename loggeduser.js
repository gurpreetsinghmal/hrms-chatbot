import { constants } from "./constants.js";
import { Processes } from "./process.js";

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

export async function checkUserProfileAndFetch() {
  // 1. Check if 'loggeduser' exists in localStorage
  let loggedUser = sessionStorage.getItem("loggeduser");
  //loggedUser = "+4CwVtdV7kfu8VNgvYSPfg==";
  if (loggedUser) {
    try {
      const response = await fetch(
        constants.SERVER_URL + `/GetServiceBookPersonalDetail`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json", // Important: Tell server this is JSON
          },
          body: JSON.stringify({ loggeduser: loggedUser }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const r = await response.json();
      if (r.status == "s") {
        let j = r.data[0].PersonalDetail;
        let p = Object.fromEntries(
          Object.entries(j).map(([key, value]) => [
            key,
            "(" + String(value) + ")",
          ])
        );
        sessionStorage.setItem("userprofile", JSON.stringify(p));
        document.getElementById("chatAvatar").style.display = "block";
      }
      console.log(" Fetched profile data...");
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  } else {
    console.log("User not logged in");
  }
}

await checkUserEncrptedAndFetch();
checkUserProfileAndFetch();

// export async function makeembeddings() {
//   //loggedUser = "+4CwVtdV7kfu8VNgvYSPfg==";

//   const processes = Object.values(Processes).map((proc) => ({
//     title: proc.title,
//     description: proc.description,
//   }));

//   console.log("making embeddings");

//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   for (const process of processes) {
//     try {
//       const response = await fetch(constants.SERVER_URL + `/embed`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: process.description,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const r = await response.json();
//       console.log(`${r.id} => ${r.status}`);

//       // ⏱️ wait 3 seconds before next request
//       await delay(3000);
//     } catch (error) {
//       console.error("Fetch failed:", error);
//     }
//   }
// }
//makeembeddings();
