export const Processes = {
  Salary_Pay_Slip: {
    title: "Salary_Pay_Slip",
    description:
      "Pay slip also known as Salary Slip is a statement of salary credited.A digital record that provides an itemized breakdown of an employee's monthly earnings, statutory deductions, and final net take-home pay",
    questions: [
      "Please confirm if you are asking for your payslip? YES or NO",
      "Please specify the month as number? example for february = 02",
      "Please specify the year as number? example 2025",
    ],
    params: {
      confirmation: null,
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
  Helpdesk_support: {
    title: "Helpdesk_support",
    description:
      "Helpdesk support provides you email and contact details of support staff for telephonic conversation",
    questions: ["Please confirm if need Helpdesk Support contact? YES or NO"],
    params: {
      confirmation: null,
      stateid: 3,
    },
  },
  Service_Book_Address: {
    title: "Service_Book_Address",
    description:
      "Service Book Address provides you address details of user like current address,permanent address and correspondence address",
    questions: ["Please confirm if need your Address Details? YES or NO"],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Education: {
    title: "Service_Book_Education",
    description:
      "Service Book Education provides information about education details like institution,year,percentage of marks and course name",
    questions: [
      "Please confirm if you as asking about Education Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Family: {
    title: "Service_Book_Family",
    description:
      "Family details of service book provides information about family relations like father,mother,children,wife,spouse",
    questions: [
      "Please confirm if you as asking about Family Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Joining: {
    title: "Service_Book_Joining",
    description:
      "Joining details of service book provides information date of inital joining, mode of recruitment, GPF or CPF Employee etc",
    questions: [
      "Please confirm if you as asking about Joining Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Nomination: {
    title: "Service_Book_Nomination",
    description:
      "Nomination details of service book tells who the employee has nominated for benefits like Gratuity, Pension, or Group Insurance in case of an eventuality. ",
    questions: [
      "Please confirm if you as asking about Nomination Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Personal: {
    title: "Service_Book_Personal",
    description:
      "Personal details of service book provides information Contains core identity like Name, DOB, Blood Group,caste",
    questions: [
      "Please confirm if you as asking about Personal Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_History: {
    title: "Service_Book_History",
    description:
      "Servide History details of service book provides information all previous postings, transfers, promotions, and designations from the date of joining until now",
    questions: [
      "Please confirm if you as asking about History Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Training: {
    title: "Service_Book_Training",
    description:
      "ists all professional workshops, induction programs, and specialized training courses the employee has completed during their service",
    questions: [
      "Please confirm if you as asking about Training Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
};
