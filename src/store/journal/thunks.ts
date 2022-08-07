import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/firebaseConfig";
import { AppDispatch, RootState } from "../store";
import {
  addNewEmptyNote,
  savingNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";
import { Note, NoteDTOCreate, NoteDTOUpdate } from "./journal.interfaces";
import { getNotesFirebase } from "../../helpers/getNotesFirebase";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const newNote: NoteDTOCreate = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    dispatch(savingNote());

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    dispatch(addNewEmptyNote({ ...newNote, id: newDoc.id, imageUrls: [] }));
    dispatch(setActiveNote({ ...newNote, id: newDoc.id, imageUrls: [] }));
  };
};

export const startLoadNotes = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    if (uid) {
      const notes: Note[] = await getNotesFirebase(uid);
      dispatch(setNotes(notes));
    }
  };
};

export const startSaveNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (note) {
      const noteToFirestore: NoteDTOUpdate = {
        body: note.body,
        date: note.date,
        imageUrls: note.imageUrls,
        title: note.title,
      };

      dispatch(setSaving());

      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToFirestore, { merge: true });

      dispatch(updateNote(note));
    }
  };
};
