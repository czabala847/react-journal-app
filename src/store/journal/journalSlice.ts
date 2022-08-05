import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JournalState } from "./journal.interfaces";

const initialState: JournalState = {
  isSaving: true,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<unknown>) => {},
    setActiveNote: (state, action: PayloadAction<unknown>) => {},
    setNotes: (state, action: PayloadAction<unknown>) => {},
    setSaving: (state, action: PayloadAction<unknown>) => {},
    updateNote: (state, action: PayloadAction<unknown>) => {},
    deleteNoteById: (state, action: PayloadAction<unknown>) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
