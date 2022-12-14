import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FirebaseAuth } from "./firebaseConfig";

import { AuthRegister } from "../auth/models/Auth.interfaces";

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
    const errorMessage = (error as FirebaseError).message;
    return { ok: false, errorMessage };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: AuthRegister) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL } = response.user;

    updateProfile(FirebaseAuth.currentUser!, {
      displayName,
    });

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorMessage = (error as FirebaseError).message;
    return { ok: false, errorMessage };
  }
};

export const loginUserWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { displayName, photoURL, uid } = response.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorMessage = (error as FirebaseError).message;
    return { ok: false, errorMessage };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
