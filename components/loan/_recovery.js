export const generateSimpleLoanTable = (data) => {
  const loans = data[0].loan_names;
  // Basic Table Styles
  const tableStyle =
    "width: 100%; border-collapse: collapse; font-family: sans-serif; margin: 20px 0;";
  const headerStyle =
    "background-color: #f2f2f2; border: 1px solid #ccc; padding: 12px; text-align: left; color: #333;";
  const cellStyle = "border: 1px solid #ccc; padding: 10px; color: #555;";

  let html = `
    <div style="padding: 10px;">
        <h3 style="font-family: sans-serif; color: #333;">Loan Recovery Details</h3>
        <table style="${tableStyle}">
            <thead>
                <tr>
                    <th style="${headerStyle}">Sr.</th>
                    <th style="${headerStyle}">Loan Description</th>
                </tr>
            </thead>
            <tbody>
                ${loans
                  .map(
                    (loan, i) => `
                    <tr>
                        <td style="${cellStyle}">${i + 1}</td>
                        <td style="${cellStyle}">${loan.Loan_name}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>`;

  return html;
};
