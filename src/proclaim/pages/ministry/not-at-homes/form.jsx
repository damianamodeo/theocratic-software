import { Button } from "common/components/inputs/button";
import { fdb } from "common/services/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { TextInput } from "common/components/inputs/text";
import { NumberInput } from "common/components/inputs/number.js";

export const Form = ({ userID, type, setContent, address, setAddress }) => {
  const notAtHomes = collection(fdb, "not-at-homes");
  const [newMap, setNewMap] = useState(address.map);
  const [newSuburb, setNewSuburb] = useState(address.suburb);
  const [newStreet, setNewStreet] = useState(address.street);
  const [newHouseNumber, setNewHouseNumber] = useState(
    type == "Submit" ? "" : address.houseNumber
  );
  const [newUnitNumber, setNewUnitNumber] = useState(
    type == "Submit" ? "" : address.UnitNumber
  );

  const add = async () => {
    await addDoc(notAtHomes, {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber,
      userID: userID,
      createdAt: serverTimestamp(),
    });
    setNewHouseNumber("");
    setNewUnitNumber("");
    setContent("list");
  };

  const update = async (id) => {
    const address = doc(fdb, "not-at-homes", id);
    const newFields = {
      map: newMap,
      suburb: newSuburb,
      street: newStreet,
      houseNumber: newHouseNumber,
      unitNumber: newUnitNumber || 0,
      createdAt: serverTimestamp(),
    };
    await updateDoc(address, newFields);
    setAddress(newFields);
    setContent("list");
  };

  const remove = async (id) => {
    const address = doc(fdb, "not-at-homes", id);
    await deleteDoc(address);
    setAddress({});
    setContent("list");
  };

  return (
    <>
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
            <TextInput
              action={(e) => {
                setNewUnitNumber(e.target.value);
              }}
              label="Unit"
              value={newUnitNumber}
            ></TextInput>
          </div>
          <div className="basis-1/4">
            <TextInput
              action={(e) => {
                setNewHouseNumber(e.target.value);
              }}
              label="House"
              value={newHouseNumber}
            ></TextInput>
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
      <div className="flex gap-4 px-6">
        {type == "Update" ? (
          <Button action={() => remove(address.id)}>Delete</Button>
        ) : null}
        <Button
          action={() => {
            if (type == "Submit") {
              add();
            } else if (type == "Update") {
              update(address.id);
            }
            setAddress({
              map: newMap,
              suburb: newSuburb,
              street: newStreet,
              houseNumber: newHouseNumber,
              unitNumber: newUnitNumber,
            });
          }}
        >
          {type}
        </Button>
      </div>
    </>
  );
};
