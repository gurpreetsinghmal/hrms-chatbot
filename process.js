export const Processes = {
  Pay_Slip: {
    title: "Pay_Slip",
    description:
      "Pay slip also known as Salary Slip is a statement of salary credited into account",
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
      "Leave Balance is a count of different leave left and belongs to an employee. example: CL(casual leave), EL(earned leaves), medical leaves, half pay leaves",
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
    description: "ACR Grading is a rating of employee work",
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
      "Profile Details gives you complete details of current logged in employee",
    questions: [
      "Please confirm if you are asking for your Profile Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
};
