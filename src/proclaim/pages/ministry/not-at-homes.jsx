import { Button } from "common/components/inputs/button";
import { fdb } from "common/services/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TextInput } from "common/components/inputs/text";
import { NumberInput } from "common/components/inputs/number.js";
import { Card } from "common/components/containers/card";
import { DefaultText } from "common/components/text/text";
import { Content } from "common/components/containers/content";
import { Accordion } from "common/components/containers/accordion";

export const NotAtHomes = ({ userID }) => {
  const notAtHomes = collection(fdb, "not-at-homes");
  const [editAddressID, setEditAddressID] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [newMap, setNewMap] = useState("");
  const [newSuburb, setNewSuburb] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newHouseNumber, setNewHouseNumber] = useState("");
  const [newUnitNumber, setNewUnitNumber] = useState("");
  const [active, setActive] = useState("");
  const [screen, setScreen] = useState("visible");

  const addAddress = async () => {
    await addDoc(notAtHomes, {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: Number(newHouseNumber),
      unitNumber: Number(newUnitNumber),
      userID: userID,
      createdAt: serverTimestamp(),
    });
    setNewHouseNumber("");
    setNewUnitNumber("");
  };

  const editAddress = (address) => {
    console.log(address.suburb)
    setEditAddressID(address.id);
    setNewMap(address.map);
    setNewSuburb(address.suburb);
    setNewStreet(address.street);
    setNewHouseNumber(address.houseNumber);
    setNewUnitNumber(address.unitNumber);
    setScreen("hidden");
  };

  const updateAddress = async (id) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = { map: newMap, suburb: newSuburb, street: newStreet, houseNumber: newHouseNumber, unitNumber: newUnitNumber, createdAt: serverTimestamp()};
    await updateDoc(address, newFields);

    setScreen("visible");
  };

  const deleteAddress = async (id) => {
    console.log(id);
    const address = doc(fdb, "not-at-homes", id);
    await deleteDoc(address);

    setScreen("visible");
  };

  useEffect(() => {
    const q = query(notAtHomes, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddresses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Content bgColor={"bg-bg dark:bg-black"}>
      <div className={` my-4 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => setScreen("visible")}>Back</Button>
      </div>
      <div className="grid gap-4 p-4">
        <TextInput
          action={(e) => {
            setNewMap(e.target.value);
          }}
          label="Map"
          value={newMap}
        ></TextInput>
        <TextInput
          action={(e) => {
            setNewSuburb(e.target.value);
          }}
          label="Suburb"
          value={newSuburb}
        ></TextInput>
        <TextInput
          action={(e) => {
            setNewStreet(e.target.value);
          }}
          label="Street"
          value={newStreet}
        ></TextInput>
        <NumberInput
          action={(e) => {
            setNewHouseNumber(e.target.value);
          }}
          label="House"
          value={newHouseNumber}
        ></NumberInput>
        <NumberInput
          action={(e) => {
            setNewUnitNumber(e.target.value);
          }}
          label="Unit"
          value={newUnitNumber}
        ></NumberInput>
      </div>
      <div className={screen}>
        <Button action={addAddress}>Add Address</Button>
        <div className="grid text-center text-sm my-4 font-noto text-blue-600 dark:text-blue-200">
          TAP ON ADDRESS TO UPDATE
        </div>
        <div >
          {addresses.map((address) => {
            return (
              <Card key={address.id} >
                {address.userID == userID ? (
                  <div className="py-" onClick={() => editAddress(address)}>
                    {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
                      address.houseNumber
                    } ${address.street}, ${address.suburb}`}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
      <div className={` my-4 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => updateAddress(editAddressID)}>Update</Button>
      </div>
      <div className={` my-4 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => deleteAddress(editAddressID)}>Delete</Button>
      </div>
    </Content>
  );
};
