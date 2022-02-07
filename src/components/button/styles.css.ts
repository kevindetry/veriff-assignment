import { style, styleVariants } from "@vanilla-extract/css";
import { theme } from "../../styles.css";
import { dp, sp } from "../../utils";

const base = style({
  margin: 0,
  paddingInline: dp(4),
  paddingBlock: 0,

  fontSize: sp(3.5),
  fontWeight: 500,
  letterSpacing: dp(0.1),
  lineHeight: dp(9.5),
  textTransform: "uppercase",

  borderStyle: "solid",
  borderWidth: dp(1 / 4),
  cursor: "pointer",

  borderRadius: dp(1),
  userSelect: "none",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
});

export const variant = styleVariants({
  filled: [
    base,
    {
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
      borderColor: "transparent",

      selectors: {
        "&:disabled": {
          color: theme.colors.onDisabled,
          backgroundColor: theme.colors.disabled,
        },

        "&:enabled:hover,&:enabled:focus": {
          filter: "brightness(110%)",
        },
      },
    },
  ],
  outlined: [
    base,
    {
      color: theme.colors.primary,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,

      selectors: {
        "&:disabled": {
          color: theme.colors.onDisabled,
          borderColor: theme.colors.disabled,
        },

        "&:enabled:hover,&:enabled:focus": {
          backgroundColor: theme.colors.highlight,
        },
      },
    },
  ],
});
