export const buildReportingOfficerCards = (data) => {
  const officers = data[0].getReportingOfficer_value;

  const cards = officers
    .map((officer) => {
      // Logic to label the leave type authority
      const leaveLabel =
        officer.leave_type === "CL"
          ? "Casual Leave Authority"
          : "General Leave Authority";
      const accentColor = officer.leave_type === "CL" ? "#f59e0b" : "#3b82f6"; // Amber for CL, Blue for Others

      // Clean the email string if necessary (reversing the [at] [dot] formatting)
      const displayEmail = officer.Email.replace(/\[at\]/g, "@").replace(
        /\[dot\]/g,
        "."
      );

      return `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); position: relative; overflow: hidden; font-family: 'Segoe UI', Roboto, sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
            <div style="background: ${accentColor}15; color: ${accentColor}; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                ${leaveLabel}
            </div>
            <div style="font-size: 11px; color: #94a3b8; font-weight: 600;">ID: ${
              officer.reporing_emp_id
            }</div>
        </div>

        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
            <div style="width: 56px; height: 56px; background: #f1f5f9; border: 2px solid ${accentColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 20px; color: ${accentColor};">
                ${officer.Name.split(" ")
                  .map((n) => n[0])
                  .join("")}
            </div>
            <div>
                <div style="font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1.2;">${
                  officer.Name
                }</div>
                <div style="font-size: 13px; color: #64748b; margin-top: 2px;">Reporting Officer</div>
            </div>
        </div>

        <div style="border-top: 1px solid #f1f5f9; padding-top: 15px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div style="width: 24px; height: 24px; background: #f8fafc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px;">📧</div>
                <a href="mailto:${displayEmail}" style="text-decoration: none; font-size: 13px; color: #3b82f6; font-weight: 500;">${displayEmail}</a>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 24px; height: 24px; background: #f8fafc; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px;">📞</div>
                <a href="tel:${
                  officer.Mobile_no
                }" style="text-decoration: none; font-size: 13px; color: #1e293b; font-weight: 600;">+91 ${
        officer.Mobile_no
      }</a>
            </div>
        </div>
      </div>
    `;
    })
    .join("");

  return `
    <div style="max-width: 800px; margin: 20px auto; padding: 0 15px;">
        <h3 style="font-family: sans-serif; color: #0f172a; margin-bottom: 20px; font-size: 20px;">Hierarchy Details</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
            ${cards}
        </div>
    </div>
  `;
};
