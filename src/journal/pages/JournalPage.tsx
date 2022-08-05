import React from "react";

import { IconButton } from "@mui/material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { AppDispatch, RootState, useAppDispatch } from "../../store";
import { startNewNote } from "../../store/journal";
import { useSelector } from "react-redux";

export const JournalPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const onNewNote = () => {
    dispatch(startNewNote() as AppDispatch);
  };

  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={onNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
