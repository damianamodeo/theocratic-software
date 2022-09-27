import Dexie from "dexie";

export const idb = new Dexie("Details");
idb.version(2).stores({
  settings: "id, firstName, middleName, lastName, otherName, congregationID, createdAt ",
});
