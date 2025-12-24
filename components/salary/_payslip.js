export function getMonthName(monthNumber) {
  // We use a dummy date (Year 2000, monthNumber - 1 because JS months are 0-indexed)
  const date = new Date(2000, monthNumber - 1);

  return date.toLocaleString("en-IN", { month: "long" });
}

export function printSalarySlip(divId) {
  const content = document.getElementById(divId).innerHTML;
  const printWindow = window.open("", "_blank", "height=800,width=1000");

  printWindow.document.write("<html><head><title>Salary Slip</title>");
  // Add any global fonts or base styles here
  printWindow.document.write(
    "<style>body { font-family: sans-serif; padding: 20px; }</style>"
  );
  printWindow.document.write("</head><body>");
  printWindow.document.write(content); // Only the slip content
  printWindow.document.write("</body></html>");

  printWindow.document.close();

  // Give images (like the logo) time to load before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

window.printSalarySlip = printSalarySlip;

export function buildSalarySlip(data) {
  let salaryData = data[0].Salary;
  let month = data[0].month;
  let year = data[0].year;
  let grossEarnings = 0;
  let totalDeductions = 0;

  // 1. Separate data into two categories
  // Usually in HRMS, codes < 50 are Earnings and >= 50 are Deductions
  const earnings = salaryData.filter((item) => item.code < 50);
  const deductions = salaryData.filter((item) => item.code >= 50);

  // 2. Calculate Totals
  earnings.forEach((item) => (grossEarnings += parseFloat(item.Amount)));
  deductions.forEach((item) => (totalDeductions += parseFloat(item.Amount)));
  const netPayable = grossEarnings - totalDeductions;

  // 3. Generate HTML
  let html = `
  <div style="display: flex; align-items: center; justify-content: space-between; background-color: #f8f9fa; border: 1px dashed #0084ff; padding: 15px 20px; border-radius: 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-top: 20px;">
    
    <div style="display: flex; align-items: center; color: #333;">
        <span style="font-size: 15px; font-weight: 500;margin-right: 10px;">
            Your salary statement is ready. You can save a copy for your records.
        </span>
    </div>

    <button onclick="printSalarySlip('slip')" style="background-color: #0084ff; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; transition: background 0.3s ease; box-shadow: 0 2px 4px rgba(0,86,179,0.2);">
        <svg style="width: 16px; height: 16px; margin-right: 8px; fill: white;" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        Download PDF
    </button>
  </div> 
    <div id="slip" style="max-width: 800px; margin: 10px auto; padding: 10px; border: 1px solid #e0e0e0; font-family: sans-serif; color: #333; background-color: #fff; border-radius: 8px;">
         <div style="display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #0084ff; padding-bottom: 15px; margin-bottom: 20px;">
            <img src="https://hrms.punjab.gov.in/assets/images/punjabemb.jpg" alt="Logo" style="max-width: 80px; height: 80px; margin-right: 20px; object-fit: contain;">
            <div style="text-align: center;">
                <h3 style="margin: 0; color: #0084ff;">GOVERNMENT OF PUNJAB</h3>
                <p style="margin: 5px 0; font-weight: bold; color: #555;">Department of Finance / HRMS</p>
                <p style="margin: 0; font-size: 14px; color: #777;">Salary Statement - ${getMonthName(
                  month
                )} ${year}</p>
            </div>
        </div>

        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f1f8ff; color: #0084ff;">
                        <th style="padding: 10px; border-bottom: 2px solid #0084ff; text-align: left;">Earnings</th>
                        <th style="padding: 10px; border-bottom: 2px solid #0084ff; text-align: right;">Amount</th>
                    </tr>
                    ${earnings
                      .map(
                        (item) => `
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;">${
                              item.Name
                            }</td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${parseFloat(
                              item.Amount
                            ).toLocaleString("en-IN")}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </table>
            </div>

            <div style="flex: 1; min-width: 300px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #fff1f1; color: #d9534f;">
                        <th style="padding: 10px; border-bottom: 2px solid #d9534f; text-align: left;">Deductions</th>
                        <th style="padding: 10px; border-bottom: 2px solid #d9534f; text-align: right;">Amount</th>
                    </tr>
                    ${deductions
                      .map(
                        (item) => `
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;">${
                              item.Name
                            }</td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${parseFloat(
                              item.Amount
                            ).toLocaleString("en-IN")}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </table>
            </div>
        </div>

        <div style="margin-top: 10px; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Gross Total:</span>
                <span style="font-weight: bold;">₹${grossEarnings.toLocaleString(
                  "en-IN"
                )}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #d9534f;">
                <span>Total Deductions:</span>
                <span style="font-weight: bold;">- ₹${totalDeductions.toLocaleString(
                  "en-IN"
                )}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 2px solid #333; font-size: 1.1em; color: #28a745; font-weight: bold;">
                <span>Net Salary:</span>
                <span>₹${netPayable.toLocaleString("en-IN")}</span>
            </div>
        </div>
        <p style="text-align: center; font-size: 11px; color: #999; margin-top: 20px; font-style: italic;">
            Note: This is an electronically generated document.
        </p>
    </div>
  `;

  return html;
}
