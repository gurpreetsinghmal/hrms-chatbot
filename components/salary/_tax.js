export function buildSalaryTaxDeduction(data) {
  const records = data[0].advancetaxdata;
  const fin_year = Number(data[0].fin_year);

  // Calculate Totals
  const totalGross = records.reduce(
    (sum, item) => sum + Number(item.GrossAmount),
    0
  );
  const totalTax = records.reduce((sum, item) => sum + Number(item.Tax), 0);

  // Generate Table Rows
  const rows = records
    .map(
      (item, index) => `
    <tr style="border-bottom: 1px solid #e2e8f0; background-color: ${
      index % 2 === 0 ? "#ffffff" : "#f8fafc"
    };">
      <td style="padding: 12px; font-size: 14px; font-weight: 500; color: #1e293b;">${
        item.Monthyear
      }</td>
      <td style="padding: 12px; font-size: 14px; font-weight: 700; color: #334155;">₹${Number(
        item.GrossAmount
      ).toLocaleString()}</td>
      <td style="padding: 12px; font-size: 14px; font-weight: 700; color: ${
        Number(item.Tax) > 0 ? "#ef4444" : "#10b981"
      };">
        ₹${item.Tax}
      </td>
      <td style="padding: 12px; font-size: 12px; color: #64748b;">
        G: ${item.Gross_arrier} | T: ${item.Tax_arrier}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <div style="max-width: 700px; margin: 20px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #1e293b; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: #ffffff; font-size: 18px;">Advance Tax Report</h3>
        <span style="color: #94a3b8; font-size: 12px;">FY ${fin_year}-${
    fin_year + 1
  }</span>
      </div>
<div style="overflow-x: auto; padding: 10px;">
      <table style="width: 100%; border-collapse: collapse; background: white; text-align: left;">
        <thead>
          <tr style="background-color: #f1f5f9; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 12px; font-size: 12px; color: #64748b; text-transform: uppercase;">Month</th>
            <th style="padding: 12px; font-size: 12px; color: #64748b; text-transform: uppercase;">Gross Amount</th>
            <th style="padding: 12px; font-size: 12px; color: #64748b; text-transform: uppercase;">Tax</th>
            <th style="padding: 12px; font-size: 12px; color: #64748b; text-transform: uppercase;">Arrears</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
        <tfoot style="background-color: #f8fafc; border-top: 2px solid #e2e8f0;">
          <tr>
            <td style="padding: 12px; font-weight: 700; font-size: 14px; color: #1e293b;">Total</td>
            <td style="padding: 12px; font-weight: 800; font-size: 15px; color: #1e293b;">₹${totalGross.toLocaleString()}</td>
            <td style="padding: 12px; font-weight: 800; font-size: 15px; color: #ef4444;">₹${totalTax.toLocaleString()}</td>
            <td style="padding: 12px;"></td>
          </tr>
        </tfoot>
      </table>
      </div>
    </div>
  `;
}
