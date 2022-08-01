import React from "react";
import { Box } from "@mui/material";

import { NavBar } from "../components/NavBar";

interface Props {
  children: JSX.Element;
}

const drawerWidth: number = 240;

export const JournalLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawerWidth={drawerWidth} />

      {/* Sidebar */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}

        {children}
      </Box>
    </Box>
  );
};
