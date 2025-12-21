export function buildImageCard(data) {
  let img;
  if (data.type.toLowerCase() == "image") {
    img = `<img src="${data.imgurl}" style="width:100%;border-radius:10px"/>`;
  }

  let html = `<b>${data.name}</b><br/>${img}`;

  return html;
}

// {type: 'image', imgurl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Diljit_Dosanjh.jpg', name: 'Gurpeet Singh'}
