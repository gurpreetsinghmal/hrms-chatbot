export const Templates = {
  payslipTemplate: {
    id: "payslipTemplate",
    format: (res) => buildImageCard(res),
  },
  leaveTemplate: {
    id: "leaveTemplate",
    format: (res) => buildDynamicTable(res),
  },
};

function buildImageCard(data) {
  let img;
  if (data.type == "image") {
    img = `<img src="${data.imgurl}" style="width:100%;border-radius:10px"/>`;
  }

  let html = `<b>${data.name}</b><br/>${img}`;

  return html;
}

// {type: 'image', imgurl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Diljit_Dosanjh.jpg', name: 'Gurpeet Singh'}

//make dynamic table using rows / columns keys

function buildDynamicTable(data) {
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
    <table class="dynamic-table">
      <thead>
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
  `;

  return html;
}
