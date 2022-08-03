import { AppDispatch } from "../store";
import { checkingCredentials } from "./authSlice";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};
