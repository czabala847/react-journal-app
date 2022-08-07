import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JournalState, Note } from "./journal.interfaces";

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizado correctamente!`;
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      state.isSaving = false;
      state.active!.imageUrls = action.payload;
    },
    deleteNoteById: (state, action: PayloadAction<unknown>) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
