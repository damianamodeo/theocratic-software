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
import { Search } from "common/components/inputs/search";

export const WriteLetter = ({ userID }) => {
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
  const [search, setSearch] = useState("");
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

  const foundHome = (id) => {};

  const foundNotHome = (id) => {};

  const updateAddress = async (id, sent) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, { letterSent: sent });

    setScreen("visible");
  };

  const deleteAddress = async (id) => {
    const address = doc(fdb, "not-at-homes", id);
    await deleteDoc(address);

    setScreen("visible");
  };

  useEffect(() => {
    const q = query(notAtHomes, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddresses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-screen bg-bgDark p-4 text-center text-2xl">
        LETTER WRITING
      </div>
      <Content bgColor={"bg-bg dark:bg-black"}>
        <div className={`my-24 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => setScreen("visible")}> {"<<< Back <<<"}</Button>
        </div>
        <div className={` ${screen}`}>
          <div className="mt-16 grid p-6 text-center font-noto text-sm text-blue-600 dark:text-blue-200">
            Tap on the address and select "LETTER
            SENT" to remove from the list
          </div>
          <div>
            {addresses.map((address) => {
              if (
                address.foundHome == "not home" &&
                address.letterSent == undefined
              ) {
                total = total + 1;
              }
              return address.foundHome == "not home" &&
                address.letterSent == undefined ? (
                <div
                  className="my-4"
                  key={address.id}
                  onClick={() => editAddress(address)}
                >
                  <Card>
                    <div>Map: {address.map}</div>
                    <div className="py-2 text-xl">
                      {`${address.unitNumber ? `${address.unitNumber}/` : ""}${
                        address.houseNumber
                      } ${address.street}, ${address.suburb}`}
                    </div>
                  </Card>
                </div>
              ) : null;
            })}
            <div className=" mt-10 text-bgDark">{total}</div>
          </div>
        </div>
        <div className={` my-8 ${screen == "visible" ? "hidden" : "visible"}`}>
          <Button action={() => updateAddress(editAddressID, "letter sent")}>
            Letter Sent
          </Button>
        </div>
      </Content>
    </>
  );
};
