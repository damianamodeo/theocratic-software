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
import { LinkText } from "common/components/text/link";

export const Callback = ({ userID }) => {
  const notAtHomes = collection(fdb, "not-at-homes");
  const [editAddressID, setEditAddressID] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState([]);
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
    setAddress(address)
    setEditAddressID(address.id);
    setNewMap(address.map);
    setNewSuburb(address.suburb);
    setNewStreet(address.street);
    setNewHouseNumber(address.houseNumber);
    setNewUnitNumber(address.unitNumber);
    setScreen("hidden");
  };


  const updateAddress = async (id, home) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, {foundHome: home});

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

  return (<>
      <div className={`fixed top-0 w-screen z-50 ${screen == "visible" ? "visible" : "hidden"}`}>
        <Search
          action={(e) => {
            setSearch(new RegExp(e.target.value, "i"));
          }}
        >
        </Search>
      </div>
    <Content bgColor={"bg-bg dark:bg-black"}>
      <div className={`my-24 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => setScreen("visible")}> {"<<< Back <<<"}</Button>
      </div>
      <div className={` ${screen}`}>
        
        <div className="my-4 pt-20 mx-10 grid text-center font-noto text-sm text-blue-600 dark:text-blue-200">
          After you have visited an address tap on it and select "HOME" or "NOT HOME"
        </div>
        <div>
          {addresses
                .filter((address) => {
                  let str = `${address.map} ${address.suburb} ${address.street}`;
                  return str.match(search);
                })
                .map((address) => {
                  if (
                    address.foundHome == undefined &
                    address.letterSent == undefined
                  ) {
                    total = total + 1;
                  }
            return address.foundHome == undefined && address.letterSent == undefined?  (
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
          <div className=" my-10 text-bgDark">
            {total}
          </div>
        </div>
      </div>
      <div className={` mt-40 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => updateAddress(editAddressID, "home")}>Home</Button>
      </div>
      <div className={` my-12 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => updateAddress(editAddressID, "not home")}>Not Home</Button>
      </div>
      <div className={` my-12 ${screen == "visible" ? "hidden" : "visible"}`}>
        <Button action={() => window.open(`external:https://www.google.com/maps/place/${address.houseNumber}+${address.street}+${address.suburb}`)}>Map</Button>
      </div>
    </Content>

  </>
  );
};
