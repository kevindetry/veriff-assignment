import { style } from "@vanilla-extract/css";
import { dp } from "../../utils";

export const root = style({
  display: "flex",
  flexDirection: "column",

  gap: dp(12),
});

export const submitButton = style({
  marginInlineStart: "auto",
});
