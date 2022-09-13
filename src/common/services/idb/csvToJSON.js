import { toTitleCase } from "../formatting/to-title-case";

export function csvToJSON(csv) {
  var lines = csv.split("\r");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      if (headers[j] === "lastName") {
        obj[headers[j]] = toTitleCase(currentline[j]);
      } else if (headers[j] === "id" || headers[j] === "familyHead") {
        obj[headers[j]] = parseInt(currentline[j]);
      } else {
        obj[headers[j]] = currentline[j];
      }
    }
    result.push(obj);
  }

  return JSON.stringify(result); //JSON
}