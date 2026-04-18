/**
 * WallAI design system — tokens from docs/DESIGN.md:
 * primary #00FF9C, neutral base #0E1111, Space Grotesk, pill shapes, normal density.
 */

import { Platform } from "react-native";

/** Raw brand primitives */
export const Brand = {
  primary: "#00FF9C",
  neutral: "#0E1111",
} as const;

/** Semantic palette — shared shape for light and dark. */
export type SemanticColorPalette = {
  text: string;
  textSecondary: string;
  textMuted: string;
  background: string;
  backgroundSecondary: string;
  card: string;
  border: string;
  tint: string;
  onPrimary: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  error: string;
  success: string;
  warning: string;
  link: string;
};

/**
 * Semantic colors per mode. `tint` is the interactive accent (same as primary).
 * `onPrimary` is foreground on primary-filled controls.
 */
export const Colors: {
  light: SemanticColorPalette;
  dark: SemanticColorPalette;
} = {
  light: {
    text: Brand.neutral,
    textSecondary: "rgba(14, 17, 17, 0.62)",
    textMuted: "rgba(14, 17, 17, 0.42)",
    background: "#FAFBFB",
    backgroundSecondary: "#F0F2F2",
    card: "#FFFFFF",
    border: "rgba(14, 17, 17, 0.10)",
    tint: Brand.primary,
    onPrimary: Brand.neutral,
    icon: "rgba(14, 17, 17, 0.48)",
    tabIconDefault: "rgba(14, 17, 17, 0.38)",
    tabIconSelected: Brand.primary,
    error: "#E53935",
    success: "#00875A",
    warning: "#E65100",
    link: Brand.primary,
  } satisfies SemanticColorPalette,
  dark: {
    text: "#F4F6F6",
    textSecondary: "rgba(244, 246, 246, 0.62)",
    textMuted: "rgba(244, 246, 246, 0.40)",
    background: Brand.neutral,
    backgroundSecondary: "#161A1A",
    card: "#1A1F1F",
    border: "rgba(255, 255, 255, 0.09)",
    tint: Brand.primary,
    onPrimary: Brand.neutral,
    icon: "rgba(244, 246, 246, 0.50)",
    tabIconDefault: "rgba(244, 246, 246, 0.36)",
    tabIconSelected: Brand.primary,
    error: "#FF6B6B",
    success: Brand.primary,
    warning: "#FFB347",
    link: Brand.primary,
  } satisfies SemanticColorPalette,
};

/** Multiplier “2” = default comfortable density (from design spec). */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  touchTarget: 44,
  touchTargetLarge: 56,
};

/**
 * Radii: design calls for maximum roundness — use `pill` for controls;
 * cards use `xl` / `2xl` for soft, friendly surfaces.
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  /** Full pill — buttons, fields, chips */
  pill: 9999,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.45,
    relaxed: 1.65,
  },
};

/**
 * Loaded via `expo-font` in root layout — names must match `useFonts` keys.
 */
export const FontFamily = {
  light: "SpaceGrotesk_300Light",
  regular: "SpaceGrotesk_400Regular",
  medium: "SpaceGrotesk_500Medium",
  semibold: "SpaceGrotesk_600SemiBold",
  bold: "SpaceGrotesk_700Bold",
} as const;

/** Fallback before fonts load (system UI). */
export const FontFamilyFallback = Platform.select({
  ios: "System",
  default: "sans-serif",
});
