import React from "react";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { NavBarItem } from "./NavBarItem";

export const SideBar: React.FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map((note) => (
            <NavBarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
