import { csvToJSON } from "./csvToJSON";

export const idbFromJSON = (idbDatabase, string, fileType, cb) => {
  const objectStoreNamesSet = new Set(idbDatabase.objectStoreNames);
  const size = objectStoreNamesSet.size;
  if (size === 0) {
    cb(null);
  } else {
    const objectStoreNames = Array.from(objectStoreNamesSet);
    const transaction = idbDatabase.transaction(objectStoreNames, "readwrite");
    transaction.onerror = (event) => alert("cb(event)");

    let json;
    if (fileType === "text/csv") {
      json = JSON.parse(`{"publishers": ${csvToJSON(string)}}`);
    } else {
      json = JSON.parse(string);
    }
    const importObject = json;
    console.log(json)

    // Delete keys present in JSON that are not present in database
    Object.keys(importObject).forEach((storeName) => {
      if (!objectStoreNames.includes(storeName)) {
        delete importObject[storeName];
      }
    });

    if (Object.keys(importObject).length === 0) {
      // no object stores exist to import for
      cb(null);
    }

    objectStoreNames.forEach((storeName) => {
      let count = 0;

      const aux = Array.from(importObject[storeName] || []);

      if (importObject[storeName] && aux.length > 0) {
        aux.forEach((toAdd) => {
          const request = transaction.objectStore(storeName).add(toAdd);
          request.onsuccess = () => {
            count++;
            if (count === importObject[storeName].length) {
              // added all objects for this store
              delete importObject[storeName];
              if (Object.keys(importObject).length === 0) {
                // added all object stores
                cb(null);
              }
            }
          };
          request.onerror = (event) => {
            console.log(event);
          };
        });
      } else {
        if (importObject[storeName]) {
          delete importObject[storeName];
          if (Object.keys(importObject).length === 0) {
            // added all object stores
            cb(null);
          }
        }
      }
    });
  }
};