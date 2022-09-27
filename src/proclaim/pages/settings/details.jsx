// import { Button } from "common/components/inputs/button";
// import React, { useEffect, useState } from "react";
// import { TextInput } from "common/components/inputs/text";
// import { NumberInput } from "common/components/inputs/number.js";
// import { Card } from "common/components/containers/card";
// import { DefaultText } from "common/components/text/text";
// import { Content } from "common/components/containers/content";
// import { Accordion } from "common/components/containers/accordion";
// import { idb } from "proclaim/services/indexedDB/idb";

// export const Details = () => {
//   const [addresses, setAddresses ] = useState([]);
//   const [firstName, setFirstName ] = useState("");
//   const [middleName, setMiddleName ] = useState("");
//   const [lastName, setLastName ] = useState("");
//   const [otherName, setOtherName ] = useState("");
//   const [congregationID, setCongregationID ] = useState("");
//   const [active, setActive] = useState("");

//   const addAddress = async () => {
//     await addDoc(notAtHomes, {
//       map: newMap,
//       suburb: newSuburb,
//       street: newStreet,
//       houseNumber: Number(newHouseNumber),
//       unitNumber: Number(newUnitNumber),
//     }); 
//     setNewHouseNumber("");
//     setNewUnitNumber("");
//   };

//   const updateAddress = async (id, suburb) => {
//     const address = doc(fdb, "not-at-homes", id);
//     const newFields = { suburb: `${suburb} x` };
//     await updateDoc(address, newFields);
//   };

//   const deleteAddress = async (id) => {
//     const address = doc(fdb, "not-at-homes", id);
//     await deleteDoc(address);
//   };

//   useEffect(() => {
//     const unsubscribe = onSnapshot(notAtHomes, (snapshot) => {
//       setAddresses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <Content bgColor={"bg-bgLightest dark:bg-black"}>
//       <div className="grid gap-4 p-4">
//         <TextInput
//           action={(e) => {
//             setNewMap(e.target.value);
//           }}
//           label="Map"
//         ></TextInput>
//         <TextInput
//           action={(e) => {
//             setNewSuburb(e.target.value);
//           }}
//           label="Suburb"
//         ></TextInput>
//         <TextInput
//           action={(e) => {
//             setNewStreet(e.target.value);
//           }}
//           label="Street"
//         ></TextInput>
//         <NumberInput
//           action={(e) => {
//             setNewHouseNumber(e.target.value);
//           }}
//           label="House"
//           value={newHouseNumber}
//         ></NumberInput>
//         <NumberInput
//           action={(e) => {
//             setNewUnitNumber(e.target.value);
//           }}
//           label="Unit"
//           value={newUnitNumber}
//         ></NumberInput>
//         <Button action={addAddress}>Add Address</Button>
//       </div>
//     </Content>
//   );
// };
