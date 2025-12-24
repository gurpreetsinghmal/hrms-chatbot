export const Endpoints = {
  salary: {
    payslip: { url: "/payslip", method: "post" },
    check: { url: "/check", method: "post" },
  },
  leave: {
    status: { url: "/leavestatus", method: "post" },
    balance: { url: "/leavebalance", method: "get" },
  },
  acr: {
    grading: { url: "/grading", method: "post" },
  },
  servicebook: {
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
