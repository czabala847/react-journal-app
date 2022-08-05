import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AuthStatus, useAppDispatch } from "../store";
import { AuthChecking } from "../ui/components";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRoutes: React.FC = () => {
  const status = useCheckAuth();

  if (status === AuthStatus.CHECKING) {
    return <AuthChecking />;
  }

  return (
    <Routes>
      {status === AuthStatus.AUTH ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
