export function buildImageCard(type, base64) {
  let img;
  let html = "";
  if (type != "unknown") {
    img = `
    <div style="display:flex;justify-content: center;">
    <img src="data:${type};base64,${base64}" alt="Profile Image"  style="width:200px;border:1px solid;border-radius:10px"/>
    </div>
    `;
    html = `${img}`;
  } else {
    img = `
    <div style="display:flex;justify-content: center;">
    <img src="/assets/noimage.jpg" alt="No Image Placeholder" style="width:200px;border:1px solid;border-radius:10px"/>
    </div>`;
    html = `${img}`;
  }
  return html;
}

// {type: 'image',
// imgurl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Diljit_Dosanjh.jpg',
//  name: 'Gurpeet Singh'}
