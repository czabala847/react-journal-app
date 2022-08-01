import React from "react";
import { AppRoutes } from "./router/AppRoutes";
import { AppTheme } from "./themes";

export const JournalApp: React.FC = () => {
  return (
    <AppTheme>
      <AppRoutes />
    </AppTheme>
  );
};
