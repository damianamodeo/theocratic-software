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

export const Form = ({ userID }) => {
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
  let total = 0;

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
    const newFields = {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, newFields);

    setScreen("visible");
  };

  const done = async (id, obj) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, obj);

    setScreen("visible");
  };

  const deleteAddress = async (id) => {
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
      <div className={`my-8 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => setScreen("visible")}> {"<<< Back <<<"}</Button>
      </div>
      <div className="grid gap-2 p-4">
        <div className="flex gap-2">
          <div className="basis-1/3">
            <NumberInput
              action={(e) => {
                setNewMap(e.target.value);
              }}
              label="Map"
              value={newMap}
            ></NumberInput>
          </div>
          <TextInput
            action={(e) => {
              setNewSuburb(e.target.value);
            }}
            label="Suburb"
            value={newSuburb}
          ></TextInput>
        </div>
        <div className="flex gap-2">
          <div className="basis-1/5">
            <NumberInput
              action={(e) => {
                setNewUnitNumber(e.target.value);
              }}
              label="Unit"
              value={newUnitNumber}
            ></NumberInput>
          </div>
          <div className="basis-1/4">
            <NumberInput
              action={(e) => {
                setNewHouseNumber(e.target.value);
              }}
              label="House"
              value={newHouseNumber}
            ></NumberInput>
          </div>
          <div>
            <TextInput
              action={(e) => {
                setNewStreet(e.target.value);
              }}
              label="Street"
              value={newStreet}
            ></TextInput>
          </div>
        </div>
      </div>
      <div className={screen}>
        <Button action={addAddress}>Submit New Address</Button>
      </div>
    </Content>
  );
};
