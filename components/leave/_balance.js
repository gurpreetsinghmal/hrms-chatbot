export const generateLeaveDashboard = (data) => {
  let leaveData = data[0].balanceLeaveList_regular;
  let type = data[0].type;
  const cards = leaveData
    .map((item) => {
      const hasBalance = Number(item.currrent_bal) > 0;
      const accentColor = hasBalance ? "#3b82f6" : "#cbd5e1"; // Blue for active, Gray for zero

      return `
      <div style="background: #ffffff; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background-color: ${accentColor};"></div>
        
        <div>
          <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px;">
            ${item.LeaveTypeName}
          </div>
          <div style="display: flex; align-items: baseline;">
            <span style="font-size: 32px; font-weight: 800; color: ${
              hasBalance ? "#0084ff" : "#6b7aa1"
            };">
              ${item.currrent_bal}
            </span>
            <span style="margin-left: 6px; font-size: 14px; color: #6b7aa1;">Days</span>
          </div>
        </div>

        <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #64748b;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Max Allowed:</span>
            <span style="color: #0084ff; font-weight: 600;">${
              item.max_at_time
            }</span>
          </div>
          ${
            item.creditondate_regular
              ? `
          <div style="display: flex; justify-content: space-between;">
            <span>Credit Date:</span>
            <span style="color: #0084ff; font-weight: 600;">${item.creditondate_regular}</span>
          </div>`
              : ""
          }
        </div>
      </div>
    `;
    })
    .join("");

  return `
    <div style="max-width: 900px; margin: 20px auto; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f8fafc; padding: 10px; border-radius: 16px; border: 1px solid #e2e8f0;">
      <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 22px; border-left: 4px solid #0084ff; padding-left: 12px;">
        ${type == "0" ? "Regular Leave " : "Special Leave"} Summary
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;">
        ${cards}
      </div>
    </div>
  `;
};
