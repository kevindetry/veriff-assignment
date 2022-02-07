import { style } from "@vanilla-extract/css";
import { theme } from "../../styles.css";
import { dp } from "../../utils";

export const root = style({
  display: "flex",
  flexDirection: "column",
  padding: dp(4),

  gap: dp(3),

  selectors: {
    "&[aria-disabled=true]": {
      color: theme.colors.onDisabled,
    },

    "&[aria-disabled=false]:hover": {
      backgroundColor: theme.colors.disabled,
    },

    "&[aria-disabled=false]:focus-within": {
      backgroundColor: theme.colors.highlight,
    },
  },
});

export const description = style({
  margin: 0,
});
