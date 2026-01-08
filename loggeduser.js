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

let faq = [
  {
    stateId: null,
    faqId: "55",
    MasterID: "16",
    MasterName: "",
    question_Eng: "How to register a new employee in HRMS?",
    question_Local: null,
    answer_eng:
      '<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n<em>Employee Enrollment &rarr; Register Employee</em></p>\n\n<p><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Instruction:</span><br />\n<span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Enter all required registration details and click Save. Upon successful submission, the system will automatically generate a unique Employee Code for the registered employee. This code will remain constant and serve as the employee&rsquo;s unique identifier throughout their entire service career.</span></p>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "56",
    MasterID: "16",
    MasterName: "",
    question_Eng: "How to transfer   Employee service  book?",
    question_Local: null,
    answer_eng:
      '<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n<em>Service Book Details &rarr; Online Service Transaction</em></p>\n\n<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Steps:</span></p>\n\n<p>&nbsp;</p>\n\n<ol>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Search the employee by entering the Employee Code or selecting from the Employee List.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">From the available transactions, select the appropriate option, such as:</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><em>Transfer</em></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><em>Transfer with Promotion</em></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><em>Shifting of Service Book Only</em><span style="background-color:transparent; font-size:11pt">, etc.</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Enter the details of the transaction, including:</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Order Number and Order Date</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Transfer Office Details</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Effective Date</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Click Save to record the transaction.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">After saving, the transaction must be verified by the competent authority.</span></p>\n\t</li>\n</ol>\n\n<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Note:</span></p>\n\n<p>&nbsp;</p>\n\n<ol>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">In case of </span><em>Shifting of Service Book Only</em><span style="background-color:transparent; font-size:11pt">, once the transaction is verified by the authority, the employee&rsquo;s service book will automatically shift to the new office.</span><br />\n\t&nbsp;</p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">For all other types of transactions, you must make entry in&nbsp; online relieving(under transfer promotion menu) against the transfer order to complete the process.</span></p>\n\t</li>\n\t<li dir="ltr">&nbsp;</li>\n</ol>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "57",
    MasterID: "16",
    MasterName: "",
    question_Eng:
      "How to make Additional Charge entry of employee in their service book",
    question_Local: null,
    answer_eng:
      '<h3 dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n<em>Service Book Detail &rarr; Additional Charge</em></h3>\n\n<h3 dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Steps:</span></h3>\n\n<ol>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Login using the Establishment Data Entry Clerk credentials of the employee who is being assigned the additional charge.</span></h3>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Navigate to Service Book Detail &rarr; Additional Charge.</span></h3>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Search the employee by entering the Employee Name or Code.</span></h3>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Under Section 2: Additional Charge Office Details, select the Office ID for which the additional charge is to be assigned.</span></h3>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">If you already know the Office ID, select it directly.</span></h3>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Otherwise, choose the Manual Parameter option to enter the details manually.</span></h3>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Select and fill in the following fields accurately:</span></h3>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Additional Charge Designation</span></h3>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Order Number</span></h3>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Order Date</span></h3>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Effective From Date</span></h3>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Click Save to record the entry.</span></h3>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">The record will now appear under the Employee Additional Charge List.</span></h3>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Send the entry for verification to the concerned Verifying Officer for approval.</span></h3>\n\t</li>\n\t<li dir="ltr">\n\t<h3 dir="ltr"><span style="background-color:transparent; font-size:11pt">Once the Verifying Officer verifies the entry, the Additional Charge record will be officially updated and visible in the employee&rsquo;s service book and respected office id for mapping.</span></h3>\n\t</li>\n</ol>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "58",
    MasterID: "16",
    MasterName: "",
    question_Eng: "How to create new DDO",
    question_Local: null,
    answer_eng:
      '<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n<em>Office Administrator &rarr; Payroll Master &rarr; Create DDO Account</em></p>\n\n<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Steps:</span></p>\n\n<ol>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Navigate to Payroll Master &rarr; Create DDO Account under your Office Administrator login.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Enter the required details:</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Treasury Code</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">DDO Code</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Stamp Details</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">TAN Number, etc</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">After filling in all fields, click Save to record the details.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Once verified, Lock the entry.</span></p>\n\n\t<p>&nbsp;</p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">A DDO Account will be created with a default password.</span></p>\n\t\t</li>\n\t</ul>\n\n\t<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Note:</span></p>\n\n\t<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Ensure that the DDO Code entered here is exactly the same as the one assigned in the IFMS Portal to maintain data consistency and integration</span></p>\n\n\t<div>&nbsp;</div>\n\n\t<ul>\n\t\t<li dir="ltr">&nbsp;</li>\n\t</ul>\n\t</li>\n</ol>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "59",
    MasterID: "16",
    MasterName: "",
    question_Eng: "How to create/update salary templet",
    question_Local: null,
    answer_eng:
      '<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n<em>Application Management &rarr; Create Salary Template</em></p>\n\n<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Steps:</span></p>\n\n<ol>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Open the Create Salary Template screen.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">In the upper section, you will see a list of Allowances.</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Select the required allowances from the left list and move them to the right (</span><em>Allowed List</em><span style="background-color:transparent; font-size:11pt">) to include them in the template.</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">In the lower section (left side), you will find a list of Deductions.</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Select the required deductions and move them to the right to add them to the template.</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">After selecting all applicable Allowances and Deductions, click Save.</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">The descriptions and selected heads from the right side will now be part of the Salary Template.</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n</ol>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "60",
    MasterID: "16",
    MasterName: "",
    question_Eng:
      "What is Opening   Balance in Regular  and Special leaves? And who can fill the Opening Balance  against each  employee?",
    question_Local: null,
    answer_eng:
      '<div dir="ltr" style="margin-left:30.95pt;">\n<table style="border-collapse:collapse; border:none">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style="vertical-align:top">\n\t\t\t<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Path:</span><br />\n\t\t\t<em>Leave Management &rarr; Set Leave Opening Balance</em></p>\n\n\t\t\t<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Instructions:</span></p>\n\n\t\t\t<ul>\n\t\t\t\t<li dir="ltr">\n\t\t\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Use this option to add or update the current leave balance of an employee.</span><br />\n\t\t\t\t&nbsp;</p>\n\t\t\t\t</li>\n\t\t\t\t<li dir="ltr">\n\t\t\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Without entering the Opening Balance, an employee cannot apply for leave&mdash;the system will not allow leave entry if the balance is missing or not updated.</span><br />\n\t\t\t\t&nbsp;</p>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<p dir="ltr"><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Role Permissions:</span></p>\n\n\t\t\t<ul>\n\t\t\t\t<li dir="ltr">\n\t\t\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">The Office Administrator can directly enter the leave opening balance for all employees,</span><br />\n\t\t\t\t<span style="background-color:transparent; font-size:11pt">OR</span><br />\n\t\t\t\t&nbsp;</p>\n\t\t\t\t</li>\n\t\t\t\t<li dir="ltr">\n\t\t\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">The Office Administrator may assign permission to any authorized employee who can then enter the Opening Balance for other employees. application management &gt;&gt; module wise menu permission&nbsp;</span></p>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
  {
    stateId: null,
    faqId: "61",
    MasterID: "16",
    MasterName: "",
    question_Eng: "How to map   Employees with the  AMA ID?",
    question_Local: null,
    answer_eng:
      '<h3 dir="ltr" style="margin-left:18pt"><strong>Process:</strong></h3>\n\n<ol>\n\t<li dir="ltr">\n\t<p dir="ltr"><strong>Login</strong><span style="background-color:transparent; font-size:11pt"> using the </span><strong>AMA Account</strong><span style="background-color:transparent; font-size:11pt">.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Navigate to:</span><br />\n\t<strong>Services &rarr; MAP HRMS Code with Login ID</strong></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><strong>Search the employee</strong><span style="background-color:transparent; font-size:11pt"> using any of the following options:</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">HRMS Code</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Employee Name</span></p>\n\t\t</li>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Help button (advanced search)</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Click </span><strong>Search</strong><span style="background-color:transparent; font-size:11pt">.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">The employee details will be displayed on the same screen.</span></p>\n\n\t<ul>\n\t\t<li dir="ltr">\n\t\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">If any information appears incorrect, click </span><strong>Generate OTP</strong><span style="background-color:transparent; font-size:11pt">.</span></p>\n\t\t</li>\n\t</ul>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">An </span><strong>OTP will be sent</strong><span style="background-color:transparent; font-size:11pt"> to the </span><strong>employee&rsquo;s registered mobile number</strong><span style="background-color:transparent; font-size:11pt"> shown on the screen.</span></p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Enter the </span><strong>OTP</strong><span style="background-color:transparent; font-size:11pt"> to verify.</span></p>\n\t</li>\n</ol>\n\n<p><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">After successful OTP verification, the </span><strong>Employee HRMS Code will be successfully mapped with the AMA Login ID</strong><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt"> in the iHRMS system.</span></p>\n\n<p>&nbsp;</p>\n\n<h3 dir="ltr" style="margin-left:18pt"><strong>Important Notes</strong></h3>\n\n<ul>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">Ensure the </span><strong>employee&rsquo;s mobile number is correctly updated</strong><span style="background-color:transparent; font-size:11pt"> in iHRMS before generating OTP.</span><br />\n\t&nbsp;</p>\n\t</li>\n\t<li dir="ltr">\n\t<p dir="ltr"><span style="background-color:transparent; font-size:11pt">OTP verification is mandatory for successful mapping.</span><br />\n\t&nbsp;</p>\n\t</li>\n</ul>\n\n<p><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">Once mapped, the AMA will be able to perform all authorized actions related to the employee&rsquo;s </span><strong>GPF / AMA workflows</strong><span style="background-color:transparent; color:rgb(0, 0, 0); font-family:arial,sans-serif; font-size:11pt">.</span></p>\n',
    answer_Local: null,
    hdnFAQId: null,
    FAQMasterList: null,
    FAQList: null,
  },
];

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
