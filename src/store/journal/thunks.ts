import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/firebaseConfig";
import { AppDispatch, RootState } from "../store";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { Note, NoteDTOCreate, NoteDTOUpdate } from "./journal.interfaces";
import { getNotesFirebase } from "../../helpers/getNotesFirebase";
import { uploadFileToCloud } from "../../helpers/uploadFileToCloud";

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

export const startUploadFiles = (files: FileList) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSaving());

    const fileUploadPromise = [];

    for (const file of files) {
      fileUploadPromise.push(uploadFileToCloud(file));
    }

    const urlsPhotos = await Promise.all(fileUploadPromise);
    dispatch(setPhotosToActiveNote(urlsPhotos));
  };
};

export const startDeletingNote = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note?.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(note!.id));
  };
};
