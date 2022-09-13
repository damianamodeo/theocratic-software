export const clearStores = (idbDatabase, stores, cb) => {
  //   const objectStoreNamesSet = new Set(idbDatabase.objectStoreNames);
    const objectStoreNamesSet = [stores];
    const size = objectStoreNamesSet.size;
    if (size === 0) {
      cb(null);
    } else {
      const objectStoreNames = Array.from(objectStoreNamesSet);
      const transaction = idbDatabase.transaction(objectStoreNames, "readwrite");
      transaction.onerror = (event) => cb(event);
  
      let count = 0;
      objectStoreNames.forEach(function (storeName) {
        transaction.objectStore(storeName).clear().onsuccess = () => {
          count++;
          if (count === size) {
            // cleared all object stores
            cb(null);
          }
        };
      });
    }
  }
  