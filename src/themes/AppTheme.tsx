import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { purpleTheme } from "./purpleTheme";

interface Props {
  children: JSX.Element;
}

export const AppTheme: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
