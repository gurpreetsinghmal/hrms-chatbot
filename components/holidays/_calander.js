export const generateCompactHolidays = (data) => {
  let year = data[0].year;
  data = data[0].holidays;
  const containerStyle =
    "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 400px; background: #fff; border: 1px solid #e1e4e8; border-radius: 8px; overflow: hidden;";
  const headerStyle =
    "background: #f6f8fa; padding: 12px 16px; border-bottom: 1px solid #e1e4e8; display: flex; justify-content: space-between; align-items: center;";
  const listStyle =
    "max-height: 400px; overflow-y: auto; list-style: none; margin: 0; padding: 0;";
  const itemStyle =
    "padding: 10px 16px; border-bottom: 1px solid #f1f1f1; display: flex; align-items: center; gap: 12px; transition: background 0.2s;";

  // Tiny Dot Colors
  const colors = {
    "Gazetted Holiday": "#cf222e", // Red
    "Restricted Holiday": "#d4a72c", // Gold
    "Second Half Day Leave": "#0969da", // Blue
  };

  const listHTML = data
    .map((item) => {
      const dotColor = colors[item.holidaytype] || "#6e7781";
      const [day, month] = item.HolidayDate.split("/");
      const monthShort = new Date(year, month - 1).toLocaleString("en", {
        month: "short",
      });

      return `
        <li style="${itemStyle}" onmouseover="this.style.background='#f9f9f9'" onmouseout="this.style.background='white'">
            <div style="text-align: center; min-width: 35px;">
                <div style="font-size: 10px; text-transform: uppercase; color: #6e7781; line-height: 1;">${monthShort}</div>
                <div style="font-size: 16px; font-weight: 700; color: #24292f;">${day}</div>
            </div>

            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${dotColor}; flex-shrink: 0;"></div>

            <div style="flex-grow: 1;">
                <div style="font-size: 13px; font-weight: 500; color: #24292f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">
                    ${item.holidayname}
                </div>
                <div style="font-size: 11px; color: #57606a;">${
                  item.dayofholiday
                }</div>
            </div>

            <div style="font-size: 10px; color: ${dotColor}; font-weight: 600; text-transform: uppercase;">
                ${item.holidaytype.split(" ")[0]}
            </div>
        </li>
        `;
    })
    .join("");

  return `
    <div style="${containerStyle}">
        <div style="${headerStyle}">
            <span style="font-weight: 600; font-size: 14px; color: #24292f;">Holiday Schedule</span>
            <span style="font-size: 11px; background: #afb8c133; padding: 2px 6px; border-radius: 10px; color: #57606a;">${year}</span>
        </div>
        <ul style="${listStyle}">
            ${listHTML}
        </ul>
        <div style="padding: 8px 16px; background: #f6f8fa; font-size: 11px; color: #6e7781; text-align: center;">
            Scroll to see all holidays
        </div>
    </div>`;
};
