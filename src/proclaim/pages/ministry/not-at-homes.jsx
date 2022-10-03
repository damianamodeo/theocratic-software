import { Button } from "common/components/inputs/button";
import { useState } from "react";
import { Content } from "common/components/containers/content";
import { Form } from "./not-at-homes/form";
import { List } from "./not-at-homes/list";

export const NotAtHomes = ({ userID }) => {
  const [content, setContent] = useState("list");
  const [form, setForm] = useState(
    [] // <Form key="submit" userID={userID} type={content} setContent={setContent} address={[]} />
  );
  const [address, setAddress] = useState({});

  const add = () => {
    setContent("Submit");
    setForm(
      <Form
        key={Date.now()}
        userID={userID}
        type={"Submit"}
        setContent={setContent}
        address={address}
        setAddress={setAddress}
      />
    );
  };

  const update = (a) => {
    setAddress(a);
    setContent("Update");
    setForm(
      <Form
        key={Date.now()}
        userID={userID}
        type={"Update"}
        setContent={setContent}
        address={a}
        setAddress={setAddress}
      />
    );
  };

  return (
    <Content bgColor={"bg-bg dark:bg-black"}>
      <div
        className={`${
          content == "Submit" || content == "Update" ? "visible" : "hidden"
        }`}
      >
        <div className=""></div>
        {form}
        <div className="m-4 m">
          <Button action={() => setContent("list")}>Back</Button>
        </div>
      </div>
      <div className={`${content == "list" ? "visible" : "hidden"}`}>
        <div className="pt-6">
          <Button action={() => add()}>Add Address</Button>
        </div>
        <List userID={userID} update={update} setAddress={setAddress}></List>
      </div>
    </Content>
  );
};
