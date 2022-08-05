import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/firebaseConfig";
import { AppDispatch, RootState } from "../store";
import {
  addNewEmptyNote,
  savingNote,
  setActiveNote,
  setNotes,
} from "./journalSlice";
import { Note, NoteDTOCreate } from "./journal.interfaces";
import { getNotesFirebase } from "../../helpers/getNotesFirebase";

export const startNewNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const newNote: NoteDTOCreate = {
      title: "",
      body: "",
      date: new Date().getTime(),
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

export const startSaveNote = (note: Note) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;

    const noteToFirestore = note;
    // delete noteToFirestore.id;

    console.log(noteToFirestore);
  };
};
