import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

globalStyle("#root", {
  display: "flex",
  justifyContent: "center",

  fontFamily: "sans-serif",
});

export const theme = createGlobalTheme("#root", {
  colors: {
    background: "#ffffff",
    disabled: "#e6ebf4",
    highlight: "#def7f7",
    onDisabled: "#bdc0cf",
    onPrimary: "#ffffff",
    primary: "#004e5f",
  },
});
