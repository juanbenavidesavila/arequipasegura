import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";

export const theme = extendTheme({
  fonts: { heading: "Open Sans, sans-serif" },
  colors,
});
