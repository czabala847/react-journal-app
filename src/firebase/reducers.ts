import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FirebaseAuth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result: UserCredential = await signInWithPopup(
      FirebaseAuth,
      googleProvider
    );

    const { displayName, email, photoURL, uid } = result.user;
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // const errorCode = (error as FirebaseError).code;
    const errorMessage = (error as FirebaseError).message;

    return {
      ok: false,
      errorMessage,
    };
  }
};
