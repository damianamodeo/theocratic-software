import { useState } from "react";
import { Button } from "./button";
// import { HelpText } from "../text/help-text";

export const FileInput = ({ id, helpText, fileTypes }) => {
  const [text, setText] = useState(helpText);

  return (
    <>
      <input
        id={id}
        type="file"
        accept={fileTypes}
        hidden="hidden"
        onChange={(e) => {
          setText(e.target.value.match(/[/\\]([\w\d\s.\-()]+)$/)[1]);
        }}
      />
      <div className="my-3 flex flex-col content-center gap-5 text-center">
        <Button
          action={() => {
            const fileInput = document.getElementById(id);
            fileInput.click();
          }}
        >
          Choose File
        </Button>
        <div>{text}</div>
      </div>
    </>
  );
};