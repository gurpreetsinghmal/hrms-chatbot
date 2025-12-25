export const generateQMS_FilteredSupportView = (data) => {
  let filterRefNo = data[0].ticketno;
  data = data[0].list;
  if (!Array.isArray(data) || data.length === 0) {
    return "<p>No Ticket available</p>";
  }

  // 1. Filter the data FIRST
  const filteredData = filterRefNo
    ? data.filter((item) => item.RefNo === filterRefNo)
    : data;

  // Styles (Clean & Professional)
  const containerStyle =
    "font-family: sans-serif; padding: 10px; background-color: #f8f9fa;overflow-x:auto";
  const headerArea =
    "margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px; display: flex; justify-content: space-between;";
  const tableStyle =
    "width: 100%; border-collapse: collapse; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);";
  const thStyle =
    "background-color: #007bff; color: white; padding: 12px; text-align: left; font-size: 14px; border: 1px solid #ddd;";
  const tdStyle =
    "padding: 12px; font-size: 13px; border: 1px solid #eee; color: #333; line-height: 1.5;";
  const badgeStyle = " font-weight: bold; color: #2e7d32;";

  // 2. Generate the HTML for the filtered set
  let rowsHTML = filteredData
    .map(
      (item) => `
        <tr>
            <td style="${tdStyle}"><strong>#${item.RefNo}</strong></td>
            <td style="${tdStyle}">${
        item.ModuleName
      }<br><small style="color: #666;">${item.Date}</small></td>
            <td style="${tdStyle}">${item.Description || "N/A"}</td>
            <td style="${tdStyle}"><span style="${badgeStyle}">${
        item.Action
      }</span></td>
            <td style="${tdStyle}">${item.IssueReslovedDate || "---"}</td>
        </tr>
    `
    )
    .join("");

  // Handle case where no ticket is found
  if (filteredData.length === 0) {
    rowsHTML = `<tr><td colspan="5" style="${tdStyle} text-align: center; padding: 40px; color: #999;">No ticket found with Ref No: ${filterRefNo}</td></tr>`;
  }

  return `
    <div style="${containerStyle}">
        <div style="${headerArea}">
            <h3 style="margin: 0; color: #333;">Support Ticket Details</h3>
            <span style="color: #666; font-size: 13px;">Records Found: ${filteredData.length}</span>
        </div>

        <table style="${tableStyle}">
            <thead>
                <tr>
                    <th style="${thStyle}">Ref No</th>
                    <th style="${thStyle}">Module</th>
                    <th style="${thStyle}">Description</th>
                    <th style="${thStyle}">Status</th>
                    <th style="${thStyle}">Resolved Date</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHTML}
            </tbody>
        </table>
    </div>`;
};
