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
  profile: {
    details: { url: "/profile", method: "post" },
  },
  support: {
    helpdesk: { url: "/support-directory", method: "post" },
  },
};
