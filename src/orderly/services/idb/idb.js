import Dexie from "dexie";

export const idb = new Dexie("Congregation");
idb.version(1).stores({
  publishers:
    "++id, firstName, middleName, lastName, [lastName+firstName], otherName, familyHead, birthDate, baptismDate, mobilePhone, homePhone, personalEmail, jwpubEmail, unitNumber, houseNumber, street, suburb, elder, servant, pioneer, groupOverseer",
  settings: "userId ",
  congregation: "name "
});