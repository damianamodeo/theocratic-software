import { Navbar } from "common/components/containers/navbar";
import { PublishersIcon } from "common/components/icons/navbar/publishers";
import { SettingsIcon } from "common/components/icons/navbar/settings";
import { Button } from "common/components/inputs/button";
import { DefaultText } from "common/components/text/text";
import { useState } from "react";
import { Callback } from "./pages/ministry/callback";
import { NotAtHomes } from "./pages/ministry/not-at-homes";
import { WriteLetter } from "./pages/ministry/write-letter";
import { Details } from "./pages/settings/details";
import { idb } from "./services/indexedDB/idb";

export const Proclaim = () => {
  const [active, setActive] = useState("Add");
  const [userID, setUserID] = useState("");

  const getUserID = async () => {
    const item = await idb.settings.get(1);
    if (item == undefined) {
      idb.settings.add({ id: 1, userID: Date.now() });
      return await idb.settings.get(1);
    } else {
      return item;
    }
  };
  getUserID().then((item) => {
    setUserID(item.userID);
  });

  return (
    <>
      <div className={`${active == "Add" ? "visible" : "hidden"}`}>{userID ? <NotAtHomes userID={userID}></NotAtHomes> : null}</div>
      <div className={`${active == "Callback" ? "visible" : "hidden"}`}>{userID ? <Callback userID={userID}></Callback> : null}</div>
      <div className={`${active == "Write" ? "visible" : "hidden"}`}>{userID ? <WriteLetter userID={userID}></WriteLetter> : null}</div>

      <Navbar>
        <div onClick={() => setActive("Add")}>
          <DefaultText>ADD</DefaultText>
        </div>
        <div onClick={() => setActive("Callback")}>
          <DefaultText>CALLBACK</DefaultText>
        </div>
        <div onClick={() => setActive("Write")}>
          <DefaultText>WRITE</DefaultText>
        </div>
      </Navbar>
    </>
  );
};
