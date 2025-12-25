export const buildGenerateLeaveStatus = (data) => {
  const history = data[0].applyLeaveStatus;

  const rows = history
    .map((item, index) => {
      // Determine color based on status
      const isApproved = item.leavestatus === "Approved";
      const statusBg = isApproved ? "#dcfce7" : "#fee2e2";
      const statusText = isApproved ? "#166534" : "#991b1b";

      return `
      <div style="background: #ffffff; border-bottom: 1px solid #f1f5f9; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 15px;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; text-align: center; min-width: 60px;">
                <div style="font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700;">${
                  item.fromdate.split("/")[1]
                } / ${item.fromdate.split("/")[2]}</div>
                <div style="font-size: 18px; font-weight: 800; color: #1e293b;">${
                  item.fromdate.split("/")[0]
                }</div>
            </div>
            
            <div>
                <div style="font-weight: 700; color: #1e293b; font-size: 15px;">${
                  item.leavetype_name
                }</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
                    ${
                      item.fromdate === item.todate
                        ? "Single Day"
                        : `${item.fromdate} to ${item.todate}`
                    } 
                    • ${item.total_days} Day(s)
                </div>
            </div>
        </div>

        <div style="background-color: ${statusBg}; color: ${statusText}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase;">
            ${item.leavestatus}
        </div>
      </div>
    `;
    })
    .join("");

  return `
    <div style="max-width: 600px; margin: 20px auto; font-family: 'Segoe UI', Roboto, sans-serif; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background: #ffffff;">
      <div style="padding: 20px; background-color: #ffffff; border-bottom: 2px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: #0f172a; font-size: 18px;">Leave History</h3>
        <span style="font-size: 12px; color: #64748b; font-weight: 500;">Total Records: ${history.length}</span>
      </div>

      <div style="max-height: 500px; overflow-y: auto;">
        ${rows}
      </div>

      <div style="padding: 12px; background: #f8fafc; text-align: center; font-size: 12px; color: #94a3b8;">
        Showing latest leave applications
      </div>
    </div>
  `;
};
