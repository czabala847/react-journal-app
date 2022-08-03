import { AppDispatch } from "../store";
import { checkingCredentials } from "./authSlice";
import { singInWithGoogle } from "../../firebase/reducers";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    console.log(result);
  };
};
