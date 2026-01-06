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
      "Leave_Balance is a count of different leave left and belongs to an employee. example: CL(casual leave), EL(earned leaves), medical leaves, half leaves,Special leaves,maternity leave",
    questions: [
      "Please confirm if you are asking for your Leave Balance? YES or NO",
      "Please specify Leave Type? Enter 0 for Regular and 1 for Special Leaves",
    ],
    params: {
      confirmation: null,
      type: null,
    },
  },
  ACR_APR_Grading: {
    title: "ACR_APR_Grading",
    description:
      "It also includes ACR Grading. ACR (Annual Confidential Report)—now often referred to as APAR (Annual Performance Appraisal Report)—is a critical document used to evaluate the performance, conduct, and integrity of employees for the financial year",
    questions: [
      "Please confirm if you are looking for ACR Details? YES or NO",
      "Please specify Request Type? Enter 1 for Pending ACR,2 for ACR Status and 3 for ACR Grading",
    ],
    params: {
      confirmation: null,
      type: null,
    },
  },
  Calander_Holidays: {
    title: "Calander_Holidays",
    description:
      "A Calendar Holidays system is a structured data collection used to track and visualize official non-working days (Gazetted, Restricted, or Half-day) to manage",
    questions: [
      "Please confirm if you are looking for Calender Holidays ? YES or NO",
      "Please specify the year as number? example 2025",
    ],
    params: {
      confirmation: null,
      year: null,
    },
  },
  Leave_Status: {
    title: "Leave_Status",
    description:
      "Leave_Status gives status of different leave applied,rejected or pending",
    questions: ["Please confirm if you want Leave Status? YES or NO"],
    params: {
      confirmation: null,
      Year: "0",
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
      "Please confirm if you are asking about Education Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Family: {
    title: "Service_Book_Family",
    description:
      "Family details of service book provides information about family relations like father,mother,children,wife,spouse",
    questions: ["Please confirm if you need about Family Details? YES or NO"],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Joining: {
    title: "Service_Book_Joining",
    description:
      "Joining details of service book provides information date of inital joining, mode of recruitment, GPF or CPF Employee etc",
    questions: [
      "Please confirm if you are asking about Joining Details? YES or NO",
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
      "Please confirm if you looking for Personal Details? YES or NO",
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
      "Please confirm if you are asking about History Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Service_Book_Training: {
    title: "Service_Book_Training",
    description:
      "Lists all professional workshops, induction programs, and specialized training courses the employee has completed during their service",
    questions: [
      "Please confirm if you as asking about Training Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Salary_Current_Annual_Report: {
    title: "Salary_Current_Annual_Report",
    description:
      "a report that summarizes an employee's total earnings and deductions for a full current financial or calendar year",
    questions: [
      "Please confirm if you are looking for Annual Statement? YES or NO",
      "Please specify the year as number? example 2025",
    ],
    params: {
      confirmation: null,
      fin_year: null,
      type: 1,
    },
  },
  Salary_Projected_Annual_Report: {
    title: "Salary_Projected_Annual_Report",
    description:
      "It tells about Estimated yearly salary  for the remaining months,projected salary,projected taxes and Forecasted tax",
    questions: [
      "Please confirm if you are asking about Projected Statement? YES or NO",
    ],
    params: {
      confirmation: null,
      type: 2,
      fin_year: "autofill",
    },
  },
  Salary_Tax_Deduction: {
    title: "Salary_Tax_Deduction",
    description:
      "a detailed breakdown report that tell different types of tax deducated in current financial or calendar year",
    questions: [
      "Please confirm if you are looking for TDS Statement? YES or NO",
      "Please specify the year as number? example 2025",
    ],
    params: {
      confirmation: null,
      fin_year: null,
    },
  },
  Leave_Reporting_Officer: {
    title: "Leave_Reporting_Officer",
    description:
      "the Leave Reporting Officer is the immediate authority responsible for reviewing, verifying, and recommending or approving an employee's leave request.",
    questions: [
      "Please confirm if you need Reporting Officer Details? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Leave_Employees_Requests: {
    title: "Leave_Employees_Requests",
    description:
      "It is list of pending leave request in your account.As a Reporting Officer many employees apply for leave to you for reviewing, verifying, and recommending or approving an employee's leave request.",
    questions: [
      "Please confirm if you are looking for Employees Leave Request for your perusal ? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  Loan_Recovery: {
    title: "Loan_Recovery",
    description:
      "It is list of Loans or Recoveries for which employess deducts from salary",
    questions: [
      "Please confirm if you are looking for Loan Details ? YES or NO",
    ],
    params: {
      confirmation: null,
    },
  },
  QMS_Filtered: {
    title: "QMS_Filtered",
    description:
      "Service gives you status of your ticket raised in query management sytem of hmrs",
    questions: [
      "Please confirm if you are looking for Ticket Status ? YES or NO",
      "Please enter Ticket ID or Reference Number",
    ],
    params: {
      confirmation: null,
      ticketno: null,
      officeid: "19733",
      deptid: "PBD0009",
    },
  },
};
//generateQMS_FilteredSupportView
