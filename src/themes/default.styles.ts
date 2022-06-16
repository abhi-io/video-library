import { createStitches } from "@stitches/core";

export const { getCssText } = createStitches({
  theme: {
    colors: {
      black: "#000",
      white: "#f2f2f2",
    },
    space: {
      defaultMargin: "20px",
    },
    radii: {
      defaultBorderRadius: "10px",
    },
  },
});
