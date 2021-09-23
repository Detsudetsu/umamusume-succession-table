import Papa from "papaparse";

export default new Promise((resolve) =>
  Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYlkP3MUc-bYeMXooupUoLGwxH0FOkBbB60zTyoO9wHvO-75lXnXbcs9GCpQBJUmHXGaCZ6U-Z7bVd/pub?gid=1051864255&single=true&output=csv",
    {
      header: true,
      download: true,
      complete: function (results) {
        resolve(results);
      }
    }
  )
);
