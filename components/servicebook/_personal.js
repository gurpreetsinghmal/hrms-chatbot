export function buildServiceBookPersonal(data) {
  let a = data[0].PersonalDetail;

  let t1_present = [
    { Title: "Name", Infomation: a.EmpName },
    { Title: "Designation", Infomation: a.CurrentDesignation },
    { Title: "Posting At", Infomation: a.CurrentPostingAt },
    { Title: "Father/Husband", Infomation: a.Guardian },
    { Title: "Gender", Infomation: a.Gender },
    { Title: "Caste", Infomation: a.Caste },
    { Title: "Category", Infomation: a.Category },
    { Title: "Religion", Infomation: a.Religion },
    { Title: "Blood Group", Infomation: a.BloodGroup },
    { Title: "Maritial Status", Infomation: a.MaritialStatus },
    { Title: "Height (cms)", Infomation: a.Height },
    { Title: "Identification Mark", Infomation: a.PersonalIdentificationMark },
    { Title: "Home State", Infomation: a.HomeState },
    { Title: "LTC Home Town", Infomation: a.LTCHomeTown },
  ];

  let html = `
  ${buildSubtable("Personal Details", t1_present)}
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
