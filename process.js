export const Processes = {
  Pay_Slip: {
    title: "Pay_Slip",
    description:
      "Pay slip also known as Salary Slip is a statement of salary credited into account.this tells about amount balance credited to your bank account",
    questions: [
      "Please confirm if you are asking for your payslip? YES or NO",
      "Please tell me you name?",
      "Please specify the month as number? example for february = 02",
      "Please specify the year as number? example 2025",
    ],
    params: {
      confirmation: null,
      name: null,
      month: null,
      year: null,
    },
  },
  Leave_Balance: {
    title: "Leave_Balance",
    description:
      "Leave_Balance is a count of different leave left and belongs to an employee. example: CL(casual leave), EL(earned leaves), medical leaves, half leaves",
    questions: [
      "Please confirm if you are asking for your Leave Balance? YES or NO",
      "Please tell me your Employee Code?",
    ],
    params: {
      confirmation: null,
      Employee_Code: null,
    },
  },
  ACR_Grading: {
    title: "ACR_Grading",
    description:
      "ACR Annual Confidential Report. It is a confidential performance appraisal report prepared annually to assess an employee’s performance, conduct, and potential over a given period",
    questions: [
      "Please confirm if you are asking for your ACR Grading? YES or NO",
      "Please tell me your Employee Code?",
    ],
    params: {
      confirmation: null,
      Employee_Code: null,
    },
  },
  Profile_details: {
    title: "Profile_details",
    description:
      "Profile Details gives you complete details of current logged in employee like name, designation,office,grade pay",
    questions: [
      "Please confirm if you are asking for your Profile Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Leave_Status: {
    title: "Leave_Status",
    description:
      "Leave Application Status gives status of applied leaves like pending,approved or rejected",
    questions: [
      "Please confirm if you are asking for your Leave Application Status? YES or NO",
      "Please tell me your Application ID?",
    ],
    params: {
      confirmation: null,
      appid: null,
    },
  },
};
