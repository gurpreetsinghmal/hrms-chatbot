import { buildDynamicTable } from "./components/_buildDynamicTable.js";
import { buildImageCard } from "./components/_buildimagecard.js";

export const Templates = {
  payslipTemplate: {
    id: "payslipTemplate",
    format: (res) => buildImageCard(res),
  },
  leaveTemplate: {
    id: "leaveTemplate",
    format: (res) => buildDynamicTable(res),
  },
};
