import { useMemo } from "react";

import { Colors, type SemanticColorPalette } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useTheme(): {
  colorScheme: "light" | "dark";
  theme: SemanticColorPalette;
  isDark: boolean;
} {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => Colors[colorScheme], [colorScheme]);
  return { colorScheme, theme, isDark: colorScheme === "dark" };
}
