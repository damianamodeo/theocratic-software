import { idb } from "./idb";
import { clearStores } from "../../../common/services/idb/clearStores";
import { idbFromJSON } from "../../../common/services/idb/idbFromJSON";

export const importStores = (stores) => {
  let file = document.querySelector("#import-stores").files[0];
  let reader = new FileReader();
  reader.onloadend = () => {
    clearStores(idb.backendDB(), stores);
    idbFromJSON(idb.backendDB(), reader.result, file.type, (err) => {
      console.log(err);
    });
  };
  reader.readAsText(file);
};
