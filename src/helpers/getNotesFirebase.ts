import { doc, collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { Note } from "../store/journal";

export const getNotesFirebase = async (uid: string) => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes: Note[] = [];
  docs.forEach((doc) => {
    let note = doc.data();
    notes.push({
      id: doc.id,
      title: note.title,
      body: note.body,
      date: note.date,
      imageUrls: [],
    });
  });

  return notes;
};
