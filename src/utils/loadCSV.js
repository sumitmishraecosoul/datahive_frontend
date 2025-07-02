import Papa from "papaparse";

export const loadInventoryCSV = (file, callback) => {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results) => callback(results.data),
  });
};
