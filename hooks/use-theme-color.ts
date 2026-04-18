/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, type SemanticColorPalette } from "@/constants/theme";
import { useTheme } from "./use-theme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof SemanticColorPalette,
) {
  const { colorScheme } = useTheme();
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorScheme][colorName];
  }
}
