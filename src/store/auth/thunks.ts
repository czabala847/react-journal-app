import { AppDispatch } from "../store";
import {
  loginUserWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";
import { AuthUser } from "./auth.interfaces";
import { AuthRegister } from "../../auth/models/Auth.interfaces";
import { cleanNotesLogout } from "../journal";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage!));

    const authUserGoogle: AuthUser = {
      displayName: result.displayName!,
      email: result.email!,
      photoURL: result.photoURL!,
      uid: result.uid!,
    };

    dispatch(login(authUserGoogle));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: AuthRegister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout(errorMessage!));

    const authUser: AuthUser = {
      displayName: displayName,
      email: email,
      photoURL: photoURL!,
      uid: uid!,
    };

    dispatch(login(authUser));
  };
};

export const startLoginWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage, displayName } =
      await loginUserWithEmailPassword(email, password);

    if (!ok) return dispatch(logout(errorMessage!));

    const authUser: AuthUser = {
      displayName: displayName!,
      email: email,
      photoURL: photoURL!,
      uid: uid!,
    };

    dispatch(login(authUser));
  };
};

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase();
    dispatch(cleanNotesLogout());
    dispatch(logout());
  };
};
