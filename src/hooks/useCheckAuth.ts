import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { login, logout, RootState, useAppDispatch } from "../store";

export const useCheckAuth = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return status;
};
