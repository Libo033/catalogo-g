"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import React from "react";

declare module "@mui/material/styles" {
  interface Palette {
    pink: Palette["primary"];
  }

  interface PaletteOptions {
    pink?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    pink: true;
  }
}

const theme = createTheme({
  palette: {
    pink: {
      main: "#c88fd1",
      light: "#c88fd1",
      dark: "#c88fd1",
      contrastText: "#ffffff",
    },
  },
});

const PinkButton = ({
  children,
  props,
}: Readonly<{ children: React.ReactNode; props: ButtonProps }>) => {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props} color="pink">
        {children}
      </Button>
    </ThemeProvider>
  );
};

export default PinkButton;
