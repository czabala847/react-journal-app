import React, { useMemo } from "react";
import { TurnedInNotOutlined } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Note, setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

export const NavBarItem: React.FC<{ note: Note }> = ({ note }) => {
  const newTitle = useMemo(() => {
    return note.title.length > 17
      ? `${note.title.substring(0, 17)}...`
      : note.title;
  }, [note.title]);

  const dispatch = useDispatch();

  const onActiveNote = () => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem key={note.id} disablePadding onClick={onActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNotOutlined />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
