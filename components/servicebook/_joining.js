export function buildServiceBookJoining(data) {
  let a = data[0].EmpJoiningDetail;

  let t1_present = [
    { Title: "Appointment Date", Infomation: a.AppointmentDate },
    { Title: "Appointment Order", Infomation: a.AppointmentOrder },
    { Title: "Joining Date", Infomation: a.JoiningDate },
    { Title: "Designation Name", Infomation: a.DesignationName },
    { Title: "Mode of Recruitment", Infomation: a.ModeOfRecruitment },
    { Title: "Employee Class", Infomation: a.EmployeeClass },
    { Title: "Employee Type", Infomation: a.EmployeeType },
    { Title: "Gazz./Non Gazz.", Infomation: a.Gazzeted },
    { Title: "Intial Basic Pay", Infomation: a.IntialBasicPay },
    { Title: "Date of Retirement", Infomation: a.DateOfRetirement },
    { Title: "Gpf/Cpf Type", Infomation: a.GpfCpfType },
    { Title: "Gpf/Cpf Number", Infomation: a.GpfCpfNumber },
    { Title: "Are you Gis Member", Infomation: a.GisMember },
  ];

  let html = `
  ${buildSubtable("Joining Details", t1_present)}
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
