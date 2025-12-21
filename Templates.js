import { buildDownloadPdf } from "./components/_buildDownloadPdf.js";
import { buildDynamicTable } from "./components/_buildDynamicTable.js";
import { buildImageCard } from "./components/_buildimagecard.js";

export const Templates = {
  payslipTemplate: {
    id: "payslipTemplate",
    format: (res) => buildDownloadPdf(res),
  },
  leaveTemplate: {
    id: "leaveTemplate",
    format: (res) => buildDynamicTable(res),
  },
  profileTemplate: {
    id: "profileTemplate",
    format: (res) => buildImageCard(res),
  },
};
