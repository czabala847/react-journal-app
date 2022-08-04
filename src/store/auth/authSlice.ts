import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AuthUser, AuthState, AuthStatus } from "./auth.interfaces";

const initialState: AuthState = {
  status: AuthStatus.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthUser>) => {
      return (state = {
        ...action.payload,
        errorMessage: null,
        status: AuthStatus.AUTH,
      });
    },
    logout: (state: AuthState, action: PayloadAction<string>) => {
      return (state = {
        ...initialState,
        errorMessage: action.payload,
        status: AuthStatus.NOT_AUTH,
      });
    },
    checkingCredentials: (state: AuthState) => {
      return (state = { ...initialState, status: AuthStatus.CHECKING });
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
