import { AppDispatch } from "../store";
import { checkingCredentials, logout, login } from "./authSlice";
import { singInWithGoogle } from "../../firebase/reducers";
import { AuthGoogle } from "./auth.interfaces";

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

    const authUserGoogle: AuthGoogle = {
      displayName: result.displayName!,
      email: result.email!,
      photoURL: result.photoURL!,
      uid: result.uid!,
    };

    dispatch(login(authUserGoogle));
  };
};
