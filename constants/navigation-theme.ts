import type { Theme } from "@react-navigation/native";
import { Platform } from "react-native";

import { Colors, FontFamily } from "@/constants/theme";

const fonts = Platform.select({
  web: {
    regular: {
      fontFamily: FontFamily.regular,
      fontWeight: "400" as const,
    },
    medium: {
      fontFamily: FontFamily.medium,
      fontWeight: "500" as const,
    },
    bold: {
      fontFamily: FontFamily.bold,
      fontWeight: "700" as const,
    },
    heavy: {
      fontFamily: FontFamily.bold,
      fontWeight: "700" as const,
    },
  },
  default: {
    regular: { fontFamily: FontFamily.regular, fontWeight: "400" as const },
    medium: { fontFamily: FontFamily.medium, fontWeight: "500" as const },
    bold: { fontFamily: FontFamily.bold, fontWeight: "700" as const },
    heavy: { fontFamily: FontFamily.bold, fontWeight: "700" as const },
  },
});

export function getNavigationTheme(scheme: "light" | "dark"): Theme {
  const c = Colors[scheme];
  return {
    dark: scheme === "dark",
    colors: {
      primary: c.tint,
      background: c.background,
      card: c.card,
      text: c.text,
      border: c.border,
      notification: c.error,
    },
    fonts,
  };
}
