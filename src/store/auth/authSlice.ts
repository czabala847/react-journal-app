import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AuthState, AuthStatus } from "./auth.interfaces";

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
    login: (state, action: PayloadAction<unknown>) => {},
    logout: (state) => {},
    checkingCredentials: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
