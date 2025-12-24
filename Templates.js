import { buildDownloadPdf } from "./components/_buildDownloadPdf.js";
import { buildDynamicTable } from "./components/_buildDynamicTable.js";
import { buildImageCard } from "./components/_buildimagecard.js";
import { buildSalarySlip } from "./components/salary/_payslip.js";
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
  leaveTemplate: {
    id: "leaveTemplate",
    format: (res) => buildDynamicTable(res),
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
};
