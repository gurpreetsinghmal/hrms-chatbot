export function buildDownloadPdf(data) {
  let pdfurl;
  if (data.type.toLowerCase() == "pdf") {
    pdfurl = `
    <div class="chip" data-action="Apply Leave">
          <i class="fa-solid fa-calendar-plus chip-icon"></i>
          <span>${data.pdfurl}</span>
        </div>
    `;
  }

  let html = `<b>PLease find the Document.</b><br/>
  Click the below button to View Document.<br/>
  ${pdfurl}
  `;

  return html;
}
