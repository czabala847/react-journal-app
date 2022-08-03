import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AuthState, AuthStatus } from "./auth.interfaces";

const initialState: AuthState = {
  status: AuthStatus.NOT_AUTH,
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
    login: (state: AuthState, action: PayloadAction<unknown>) => {},
    logout: (state: AuthState) => {},
    checkingCredentials: (state: AuthState) => {
      state.status = AuthStatus.CHECKING;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
