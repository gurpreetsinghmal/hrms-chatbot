export const Endpoints = {
  salary: {
    //3 services
    payslip: { url: "/GetSalaryPayslip", method: "post" },
    current: { url: "/GetAnnualSalaryStatement", method: "post" },
    projected: { url: "/GetAnnualSalaryStatement", method: "post" },
    tax: { url: "/GetSalaryTaxDeducation", method: "post" },
  },
  leave: {
    balance: { url: "/GetLeaveBalance", method: "post" },
    status: { url: "/GetLeaveStatus", method: "post" },
    reporting: { url: "/GetReportingOfficer", method: "post" },
    requests: { url: "/GetLeaveRequestsOfEmployees", method: "post" },
  },
  acr: {
    grading: { url: "/GetACR_APAR_GRADING", method: "post" },
  },
  loan: {
    recovery: { url: "/GetLoanNames", method: "post" },
  },
  qms: {
    ticket: { url: "/GetComplaintinfo", method: "post" },
  },
  calander: {
    holidays: { url: "/GetHolidays", method: "post" },
  },
  servicebook: {
    //8 services
    address: { url: "/GetServiceBookAddress", method: "post" },
    education: { url: "/GetServiceBookEducation", method: "post" },
    family: { url: "/GetServiceBookFamilyDetail", method: "post" },
    joining: { url: "/GetServiceBookEmpJoiningDetail", method: "post" },
    nomination: { url: "/GetServiceBookNominationDetails", method: "post" },
    personal: { url: "/GetServiceBookPersonalDetail", method: "post" },
    history: { url: "/GetServiceBookEmpServiceHistory", method: "post" },
    training: { url: "/GetServiceBookEmpTrainingHistory", method: "post" },
  },
  support: {
    helpdesk: { url: "/support-directory", method: "post" },
  },
};
