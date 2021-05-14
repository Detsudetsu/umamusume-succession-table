import Papa from "papaparse";
import name_id_table_promise from "./name2id";

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
    }
  }
);

function transpose(array) {
  if (!Array.isArray(array)) throw new TypeError();
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}

function mapFunc(name) {
  // TODO: chara_idに紐づけて変更
  return name + "w";
}

async function toImg(array) {
  const idTable = await name_id_table_promise;

  return array.map((row) => row.map((name) => mapFunc(name)));
}

function createTable(array) {
  let content = "";
  if (!Array.isArray(array)) throw new TypeError();
  array.forEach(function (row) {
    content += "<tr>";
    row.forEach(function (cell) {
      content += "<td>" + cell + "</td>";
    });
    content += "</tr>";
  });
  document.getElementById("succession-table").innerHTML = content;
}
