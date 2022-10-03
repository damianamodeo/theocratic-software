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
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card } from "common/components/containers/card";

export const List = ({ userID, update, setAddress }) => {
  const notAtHomes = collection(fdb, "not-at-homes");
  let total = 0;
  const [addresses, setAddresses] = useState([]);

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
    <>
      <div>
        {addresses.map((address) => {
          if (
            address.userID == userID &&
            (address.foundHome == undefined) & (address.letterSent == undefined)
          ) {
            total = total + 1;
          }
          return address.userID == userID ? (
            <div
              className="my-4"
              key={address.id}
              onClick={() => {
                update(address);
              }}
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

        <div className="mb-24 grid text-center font-noto text-sm text-blue-600 dark:text-blue-200">
          Total Addresses: {total}
        </div>
      </div>
    </>
  );
};
