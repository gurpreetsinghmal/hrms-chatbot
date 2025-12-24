export function buildServiceBookAddress(data) {
  let a = data[0].Address;
  let t1_present = [
    { Title: "Address", Infomation: a.PresentAddress },
    { Title: "Block", Infomation: a.PresentBlock },
    { Title: "District", Infomation: a.PresentDistrict },
    { Title: "State", Infomation: a.PresentState },
    { Title: "Pincode", Infomation: a.PresentPinCode },
    { Title: "Mobile", Infomation: a.PresentMobile },
    { Title: "Email", Infomation: a.PresentEmail },
    { Title: "Phone", Infomation: a.PresentPhone },
  ];
  let t1_parmanent = [
    { Title: "Address", Infomation: a.PermanentAddress },
    { Title: "Block", Infomation: a.PermanentBlock },
    { Title: "District", Infomation: a.PermanentDistrict },
    { Title: "State", Infomation: a.PermanentState },
    { Title: "Pincode", Infomation: a.PermanentPinCode },
    { Title: "Mobile", Infomation: a.PermanentMobile },
    { Title: "Email", Infomation: a.PermanentEmail },
    { Title: "Phone", Infomation: a.PermanentPhone },
  ];
  let html = `
  ${buildSubtable("Present Details", t1_present)}
  ${buildSubtable("Permanent Details", t1_parmanent)}
  
  `;
  return html;
}

export function buildSubtable(title, data) {
  // No data? Show message
  if (!Array.isArray(data) || data.length === 0) {
    return "<p>No data available</p>";
  }

  // Get all unique column names
  const columns = Array.from(
    data.reduce((cols, obj) => {
      Object.keys(obj).forEach((key) => cols.add(key));
      return cols;
    }, new Set())
  );

  // Start building table HTML
  let html = `
    <div class="xresponsive">
    <table class="dynamic-table">
      <thead>
        <tr>
        <th colspan=2 style="color:#0084ff;font-size:15px;">${title}</th>
        </tr>
        <tr>
          ${columns.map((col) => `<th>${col}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
  `;

  // Build rows
  data.forEach((item) => {
    html += "<tr>";
    columns.forEach((col) => {
      html += `<td>${item[col] !== undefined ? item[col] : ""}</td>`;
    });
    html += "</tr>";
  });

  html += `
      </tbody>
    </table>
    </div>
  `;

  return html;
}
