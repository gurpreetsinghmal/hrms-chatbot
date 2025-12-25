import { buildDownloadPdf } from "./components/_buildDownloadPdf.js";
import { buildDynamicTable } from "./components/_buildDynamicTable.js";
import { buildImageCard } from "./components/_buildimagecard.js";
import { generateACRTable } from "./components/acr/_grading.js";
import { generateCompactHolidays } from "./components/holidays/_calander.js";
import { generateLeaveDashboard } from "./components/leave/_balance.js";
import { buildReportingOfficerCards } from "./components/leave/_reporting.js";
import { buildGenerateLeaveStatus } from "./components/leave/_status.js";
import { generateSimpleLoanTable } from "./components/loan/_recovery.js";
import { generateQMS_FilteredSupportView } from "./components/qms/_ticket.js";
import { buildSalarySlip } from "./components/salary/_payslip.js";
import { buildSalaryAnnualReport } from "./components/salary/_projected.js";
import { buildSalaryTaxDeduction } from "./components/salary/_tax.js";
import { buildServiceBookAddress } from "./components/servicebook/_address.js";
import { buildServiceBookEducation } from "./components/servicebook/_education.js";
import { buildServiceBookFamily } from "./components/servicebook/_family.js";
import { buildServiceBookHistory } from "./components/servicebook/_history.js";
import { buildServiceBookJoining } from "./components/servicebook/_joining.js";
import { buildServiceBookNomination } from "./components/servicebook/_nomination.js";
import { buildServiceBookPersonal } from "./components/servicebook/_personal.js";
import { buildServiceBookTraining } from "./components/servicebook/_training.js";

export const Templates = {
  GetSalaryPayslip: {
    id: "GetSalaryPayslip",
    format: (res) => buildSalarySlip(res),
  },
  LeaveBalanceTemplate: {
    id: "LeaveBalanceTemplate",
    format: (res) => generateLeaveDashboard(res),
  },
  profileTemplate: {
    id: "profileTemplate",
    format: (res) => buildImageCard(res),
  },
  ServiceAddressTemplate: {
    id: "ServiceAddressTemplate",
    format: (res) => buildServiceBookAddress(res),
  },
  ServiceEducationTemplate: {
    id: "ServiceEducationTemplate",
    format: (res) => buildServiceBookEducation(res),
  },
  ServiceFamilyTemplate: {
    id: "ServiceFamilyTemplate",
    format: (res) => buildServiceBookFamily(res),
  },
  ServiceJoinigTemplate: {
    id: "ServiceJoinigTemplate",
    format: (res) => buildServiceBookJoining(res),
  },
  ServiceNominationTemplate: {
    id: "ServiceNominationTemplate",
    format: (res) => buildServiceBookNomination(res),
  },
  ServicePersonalTemplate: {
    id: "ServicePersonalTemplate",
    format: (res) => buildServiceBookPersonal(res),
  },
  ServiceHistoryTemplate: {
    id: "ServiceHistoryTemplate",
    format: (res) => buildServiceBookHistory(res),
  },
  ServiceTrainingTemplate: {
    id: "ServiceTrainingTemplate",
    format: (res) => buildServiceBookTraining(res),
  },
  SalaryAnnualReportTemplate: {
    id: "SalaryAnnualReportTemplate",
    format: (res) => buildSalaryAnnualReport(res),
  },
  SalaryTaxTemplate: {
    id: "SalaryTaxTemplate",
    format: (res) => buildSalaryTaxDeduction(res),
  },
  LeaveStatusTemplate: {
    id: "LeaveStatusTemplate",
    format: (res) => buildGenerateLeaveStatus(res),
  },
  LeaveReportingTemplate: {
    id: "LeaveReportingTemplate",
    format: (res) => buildReportingOfficerCards(res),
  },
  LeaveRequestsOfEmployeesTemplate: {
    id: "LeaveRequestsOfEmployees",
    format: (res) => buildDynamicTable(res),
  },
  ACR_APR_GradingTemplate: {
    id: "ACR_APR_GradingTemplate",
    format: (res) => generateACRTable(res),
  },
  Loan_Recovery_Template: {
    id: "Loan_Recovery_Template",
    format: (res) => generateSimpleLoanTable(res),
  },
  QMS_Template: {
    id: "QMS_Template",
    format: (res) => generateQMS_FilteredSupportView(res),
  },
  Calander_Template: {
    id: "Calander_Template",
    format: (res) => generateCompactHolidays(res),
  },
};
