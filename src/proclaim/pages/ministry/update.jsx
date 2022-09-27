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
  const [addresses, setAddresses] = useState([]);
  const [newMap, setNewMap] = useState("");
  const [newSuburb, setNewSuburb] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newHouseNumber, setNewHouseNumber] = useState("");
  const [newUnitNumber, setNewUnitNumber] = useState("");
  const [active, setActive] = useState("");

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

  const updateAddress = async (id, suburb) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = { suburb: `${suburb} x` };
    await updateDoc(address, newFields);
  };

  const deleteAddress = async (id) => {
    const address = doc(fdb, "not-at-homes", id);
    await deleteDoc(address);
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
    <Content bgColor={"bg-bgLightest dark:bg-black"}>
      <div className="grid gap-4 p-4">
        <TextInput
          action={(e) => {
            setNewMap(e.target.value);
          }}
          label="Map"
        ></TextInput>
        <TextInput
          action={(e) => {
            setNewSuburb(e.target.value);
          }}
          label="Suburb"
        ></TextInput>
        <TextInput
          action={(e) => {
            setNewStreet(e.target.value);
          }}
          label="Street"
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
        <Button action={addAddress}>Add Address</Button>
      </div>
      <div className="font-noto text-blue-600 dark:text-blue-200 grid text-center">
        TAP ON ADDRESS TO UPDATE
      </div>
      <div>
        {addresses.map((address) => {
          return (
            <div key={address.id} >
              {address.userID == userID ? (
                <Accordion
                  title={`${
                    address.unitNumber ? `${address.unitNumber}/` : ""
                  }${address.houseNumber} ${address.street}, ${address.suburb}`}
                  active={active}
                  setActive={setActive}
                >
                  <>
                    <div className="my-4">
                      <Button action={() => updateAddress(address.id)}>Update Address</Button>
                    </div>
                    <div className="my-4">
                      <Button action={() => deleteAddress(address.id)}>Delete Address</Button>
                    </div>
                  </>
                </Accordion>
              ) : null}
            </div>
          );
        })}
      </div>
    </Content>
  );
};
