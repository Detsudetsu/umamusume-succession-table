import Papa from "papaparse";
import name_id_table_promise from "./name2id";

export default new Promise((resolve) =>
  Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRA0YIC6SPJ15Zuh7BfAkg9SnXuc3m-99_9gloVTSqb0MtFHnylLAVBOw4iyj3tdJX2av1RwVKWFu0c/pub?gid=343920262&single=true&output=csv",
    {
      download: true,
      complete: async function (results) {
        results.data.splice(1, 1);
        results.data.splice(-1, 1);
        const r = transpose(results.data);
        const b = await toImg(r);
        createTable(b);
        resolve();
      }
    }
  )
);

function transpose(array) {
  if (!Array.isArray(array)) throw new TypeError();
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}

async function toImg(array) {
  const idTable = await name_id_table_promise;
  return array.map((row) => {
    const header = row[0];
    const imgRow = row.map((name) => rename(name));
    imgRow.splice(1, 0, header);
    return imgRow;
  });

  function rename(name) {
    const id = idTable.data.find((e) => e.jpname === name).chara_id;
    return `<img src="img/chr_icon_${id}.png"/>`;
  }
}

function createTable(array) {
  let content = "";
  for (const row of array) {
    content += "<tr>";
    for (const cell of row) {
      content += `<td>${cell}</td>`;
    }
    content += "</tr>";
  }
  document.getElementById("succession-table").innerHTML = content;
}
