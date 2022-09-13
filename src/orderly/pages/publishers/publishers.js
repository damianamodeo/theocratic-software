import { useState } from "react";
import { List } from "./list";

export const Publishers = () => {

  const [page, setPage] = useState(<List />);
  return (
    <>
      {page}
    </>
  );
};
