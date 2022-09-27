import React, { useState } from "react";
import { Publishers } from "./pages/publishers/publishers";
import { Card } from "common/components/containers/card";

export const Orderly = () => {
  const [page, setPage] = useState(<Publishers />);
  return <>{page}</>;
};
