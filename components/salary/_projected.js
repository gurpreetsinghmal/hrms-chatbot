import { getMonthName, printSalarySlip } from "./_payslip.js";

export function buildSalaryAnnualReport(xdata) {
  let data = xdata[0].SalaryStatement;
  let fin_year = xdata[0].fin_year;
  let type = xdata[0].type;

  // 1. Group data by Month
  const reportMap = {};
  const salaryHeads = new Set();

  data.forEach((item) => {
    const monthKey = item.Month_order; // Using Month_order to keep chronological sequence
    if (!reportMap[monthKey]) {
      reportMap[monthKey] = {
        monthName: getMonthName(parseInt(item.Month_value)),
        year: item.Fin_year,
        earnings: {},
        deductions: {},
        totalEarnings: 0,
        totalDeductions: 0,
      };
    }

    const amt = parseFloat(item.Amount_vale_all);
    const code = parseInt(item.All_ded_code);
    const name = item.Abrevation_value;

    salaryHeads.add(name);

    if (code < 50) {
      reportMap[monthKey].earnings[name] = amt;
      reportMap[monthKey].totalEarnings += amt;
    } else {
      reportMap[monthKey].deductions[name] = amt;
      reportMap[monthKey].totalDeductions += amt;
    }
  });

  // 2. Sort months by Month_order
  const sortedMonths = Object.keys(reportMap).sort((a, b) => a - b);

  // 3. Generate HTML
  return `
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
      <div style="padding-top:10px;display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #0084ff; padding-bottom: 15px; margin-bottom: 20px;">
            <img src="https://hrms.punjab.gov.in/assets/images/punjabemb.jpg" alt="Logo" style="max-width: 80px; height: 80px; margin-right: 20px; object-fit: contain;">
            <div style="text-align: center;">
                <h3 style="margin: 0; color: #0084ff;">GOVERNMENT OF PUNJAB</h3>
                <p style="margin: 5px 0; font-weight: bold; color: #555;">Department of Finance / HRMS</p>
                <p style="margin: 0; font-size: 14px; color: #777;">${
                  type == 1 ? "CURRENT" : "PROJECTED"
                } ANNUAL SALARY STATEMENT - ${fin_year}</p>
            </div>
        </div>
      

      <div style="overflow-x: auto; padding: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6;">Month</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; color: #0061ff;">Basic Pay</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; color: #0061ff;">DA</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; font-weight: bold; background: #f1f8ff;">Gross Pay</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; color: #d9534f;">GPF-S</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; color: #d9534f;">GIS</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; font-weight: bold; background: #fff1f1;">Total Ded.</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; font-weight: bold; background: #e9f7ef; color: #28a745;">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            ${sortedMonths
              .map((key) => {
                const row = reportMap[key];
                const net = row.totalEarnings - row.totalDeductions;
                return `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px; font-weight: 600; color: #555;">${
                    row.monthName
                  } ${row.year}</td>
                  <td style="padding: 12px; text-align: right;">₹${(
                    row.earnings["BP"] || 0
                  ).toLocaleString("en-IN")}</td>
                  <td style="padding: 12px; text-align: right;">₹${(
                    row.earnings["DA"] || 0
                  ).toLocaleString("en-IN")}</td>
                  <td style="padding: 12px; text-align: right; font-weight: 600; background: #f1f8ff;">₹${row.totalEarnings.toLocaleString(
                    "en-IN"
                  )}</td>
                  <td style="padding: 12px; text-align: right;">₹${(
                    row.deductions["GPF-S"] || 0
                  ).toLocaleString("en-IN")}</td>
                  <td style="padding: 12px; text-align: right;">₹${(
                    row.deductions["GIS"] || 0
                  ).toLocaleString("en-IN")}</td>
                  <td style="padding: 12px; text-align: right; font-weight: 600; background: #fff1f1;">₹${row.totalDeductions.toLocaleString(
                    "en-IN"
                  )}</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; color: #28a745; background: #e9f7ef;">₹${net.toLocaleString(
                    "en-IN"
                  )}</td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      </div>

      <div style="background: #fdfdfd; padding: 25px; border-top: 2px solid #eee; display: flex; justify-content: flex-end;">
        <div style="text-align: right; min-width: 250px;">
           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #666;">Annual Gross:</span>
              <span style="font-weight: 600;">₹${Object.values(reportMap)
                .reduce((acc, curr) => acc + curr.totalEarnings, 0)
                .toLocaleString("en-IN")}</span>
           </div>
           <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #d9534f;">
              <span>Annual Deductions:</span>
              <span style="font-weight: 600;">- ₹${Object.values(reportMap)
                .reduce((acc, curr) => acc + curr.totalDeductions, 0)
                .toLocaleString("en-IN")}</span>
           </div>
           <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #333; font-size: 18px; color: #28a745; font-weight: bold;">
              <span>Net Annual Pay:</span>
              <span>₹${Object.values(reportMap)
                .reduce(
                  (acc, curr) =>
                    acc + (curr.totalEarnings - curr.totalDeductions),
                  0
                )
                .toLocaleString("en-IN")}</span>
           </div>
        </div>
      </div>
    </div>
  `;
}
