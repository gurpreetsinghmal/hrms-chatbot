export const generateACRTable = (data) => {
  data = data[0].log;
  // Container Style
  const containerStyle =
    "font-family: Arial, sans-serif; padding: 10px; background: #f4f7f6; border-radius: 8px;overflow-x:auto";
  // Table Style
  const tableStyle =
    "width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;";
  // Header Style
  const thStyle =
    "background-color: #0056b3; color: white; padding: 5px; text-align: left; text-transform: uppercase; border: 1px solid #ddd;";
  // Cell Style
  const tdStyle = "padding: 5px; border: 1px solid #eee; color: #333;";
  // Status Badge Style
  const badgeStyle =
    "padding: 4px; background: #e1f0ff; border-radius: 4px; color: #0056b3; font-weight: bold;";

  let tableHTML = `
    <div style="${containerStyle}">
        <h2 style="color: #333; margin-bottom: 20px; border-left: 5px solid #0056b3; padding-left: 10px;">Annual Confidential Report (ACR) History</h2>
        <table style="${tableStyle}">
            <thead>
                <tr>
                    <th style="${thStyle}">S.No</th>
                    <th style="${thStyle}">Financial Year</th>
                    <th style="${thStyle}">Period From</th>
                    <th style="${thStyle}">Period To</th>
                    <th style="${thStyle}">Type</th>
                    <th style="${thStyle}">Current Status / Location</th>
                    <th style="${thStyle}">Final Grading</th>
                </tr>
            </thead>
            <tbody>
                ${data
                  .map(
                    (item, index) => `
                    <tr style="background-color: ${
                      index % 2 === 0 ? "#ffffff" : "#f9f9f9"
                    };">
                        <td style="${tdStyle}">${item.SNo}</td>
                        <td style="${tdStyle}"><strong>${
                      item.finYear
                    }</strong></td>
                        <td style="${tdStyle}">${item.Periodf}</td>
                        <td style="${tdStyle}">${item.Periodt}</td>
                        <td style="${tdStyle}">${item.typeACR}</td>
                        <td style="${tdStyle}"><span style="${badgeStyle}">${
                      item.status1
                    }</span></td>
                        <td style="${tdStyle}">${
                      item.FinalGrading ||
                      '<em style="color:#999;">Pending</em>'
                    }</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>`;

  return tableHTML;
};
