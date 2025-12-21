import { constants } from "../constants.js";

export function buildDownloadPdf(data) {
  let pdfurl;
  if (data.type.toLowerCase() == "pdf") {
    let filename = `Payslip_${data.month}_${data.year}.pdf`;
    let URI =
      constants.SERVER_URL +
      "/proxy-pdf?url=" +
      encodeURIComponent(data.pdfurl);
    pdfurl = `
    <div class="bot-link-btn" style="cursor:pointer" onclick="forceDownloadPdf('${URI}', '${filename}')">
        <i class="fa-solid fa-file-arrow-down" style="color:white"></i>
          <span>Download</span>
    </div>
    `;
  }

  let html = `<b>Your document is ready. Please download it by clicking the button below.</b>
  <br/>
 <br/>
  ${pdfurl}
  `;

  return html;
}

function store(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = "Pay Slip.pdf"; //filename || url.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.store = store; // make it global
export { store };

async function forceDownloadPdf(url, filename) {
  try {
    // Fetch the file
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Convert to blob (binary file representation)
    const blob = await response.blob();

    // Create a temporary URL pointing to the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor and click it to force download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || url.split("/").pop();
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
}
window.forceDownloadPdf = forceDownloadPdf;
