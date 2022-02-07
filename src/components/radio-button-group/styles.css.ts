import { style } from "@vanilla-extract/css";
import { dp } from "../../utils";

export const item = style({
  lineHeight: dp(8.5),
  textTransform: "revert",

  selectors: {
    "&:not(:last-of-type)": {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
    },

    "&:not(:first-of-type)": {
      marginInlineStart: dp(-1 / 4),

      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
    },
  },
});
