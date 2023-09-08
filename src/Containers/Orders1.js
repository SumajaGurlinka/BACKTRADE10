import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";

import Orders from "./Orders";

const Orders1 = () => {
  return (
    <Box style={{ height: "100vh" }}>
      <Header />
      <Orders />
    </Box>
  );
};

export default Orders1;
