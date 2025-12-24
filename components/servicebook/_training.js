export function buildServiceBookTraining(data) {
  let a = data[0].trainingDetails;

  const t1_present = a.map((edu) => ({
    "Training Type": edu.TrainingType,
    "Office Name": edu.Topic,
    Insitute: edu.Insitute,
    Sponservy: edu.Sponservy,
    "from Date": edu.fromdate,
    "To Date": edu.Todate,
    "Training Place": edu.TrainingPlace,
  }));

  let html = `
  ${buildSubtable("Training Details", t1_present)}
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
        <th colspan=${
          columns.length
        } style="color:#0084ff;font-size:15px;">${title}</th>
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
