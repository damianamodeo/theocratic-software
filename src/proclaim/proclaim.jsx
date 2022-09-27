import { Navbar } from "common/components/containers/navbar";
import { PublishersIcon } from "common/components/icons/navbar/publishers";
import { SettingsIcon } from "common/components/icons/navbar/settings";
import { Button } from "common/components/inputs/button";
import { useState } from "react";
import { NotAtHomes } from "./pages/ministry/not-at-homes";
import { Details } from "./pages/settings/details";
import { idb } from "./services/indexedDB/idb";

export const Proclaim = () => {
  const [active, setActive] = useState("Not At Homes");
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
      {userID ? <NotAtHomes userID={userID}></NotAtHomes> : null}
      {/* <Navbar>
        <PublishersIcon
          title="Not At Homes"
          active={active}
          setActive={setActive}
        />
        <SettingsIcon title="Settings" active={active} setActive={setActive} />
      </Navbar> */}
    </>
  );
};
