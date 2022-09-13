import React, { useState } from "react";
import { Publishers } from "./pages/publishers/publishers";

export const Orderly = () => {
  const [page, setPage] = useState(<Publishers />);
  return <>{page}</>;
};
