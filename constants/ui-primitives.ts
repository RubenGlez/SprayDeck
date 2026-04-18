/**
 * Cross-screen UI primitives — use with `useTheme().theme` for colors.
 */

import type { TextStyle } from "react-native";
import { Platform } from "react-native";

import {
  BorderRadius,
  FontFamily,
  Spacing,
  Typography,
  type SemanticColorPalette,
} from "@/constants/theme";

/** Backdrop opacity for @gorhom/bottom-sheet modals */
export const SHEET_BACKDROP_OPACITY = 0.52;

export function sheetModalBackground(
  theme: SemanticColorPalette,
): {
  backgroundColor: string;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
} {
  return {
    backgroundColor: theme.background,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
  };
}

/** Shared text-field look (merge with layout height if needed). */
export function themedTextInput(
  theme: SemanticColorPalette,
  options?: { minHeight?: number },
): TextStyle {
  return {
    minHeight: options?.minHeight ?? 44,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.backgroundSecondary,
    color: theme.text,
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.regular,
  };
}

/** Hex codes and technical strings */
export const monoHexFontFamily = Platform.select({
  ios: "Menlo",
  android: "monospace",
  default: "monospace",
}) as string;

export const TypeStyles = {
  overline: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.semibold,
    textTransform: "uppercase",
    letterSpacing: 0.55,
  } satisfies TextStyle,
  listRowTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.semibold,
  } satisfies TextStyle,
  listRowMeta: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.regular,
  } satisfies TextStyle,
  listAction: {
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.medium,
  } satisfies TextStyle,
  cardTitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.semibold,
    textAlign: "center" as const,
  } satisfies TextStyle,
  sectionHeading: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.semibold,
    textTransform: "uppercase",
  } satisfies TextStyle,
  matchTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.semibold,
  } satisfies TextStyle,
  matchMeta: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.regular,
  } satisfies TextStyle,
  similarityBadge: {
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.semibold,
  } satisfies TextStyle,
} as const;
