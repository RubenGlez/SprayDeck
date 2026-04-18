import { StyleSheet, Text, type TextProps } from "react-native";

import { FontFamily, Typography } from "@/constants/theme";
import { TypeStyles } from "@/constants/ui-primitives";
import { useTheme } from "@/hooks/use-theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "overline"
    | "caption"
    | "muted"
    | "rowTitle"
    | "similarity";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  const resolvedColor = (() => {
    switch (type) {
      case "link":
        return theme.link;
      case "overline":
      case "caption":
        return theme.textSecondary;
      case "muted":
        return theme.textMuted;
      case "similarity":
        return theme.tint;
      case "title":
      case "subtitle":
      case "defaultSemiBold":
      case "default":
      case "rowTitle":
      default:
        return defaultColor;
    }
  })();

  const typeStyle =
    type === "default"
      ? styles.default
      : type === "title"
        ? styles.title
        : type === "defaultSemiBold"
          ? styles.defaultSemiBold
          : type === "subtitle"
            ? styles.subtitle
            : type === "link"
              ? styles.link
              : type === "overline"
                ? styles.overline
                : type === "caption"
                  ? styles.caption
                  : type === "muted"
                    ? styles.muted
                    : type === "rowTitle"
                      ? styles.rowTitle
                      : type === "similarity"
                        ? styles.similarity
                        : undefined;

  return (
    <Text
      style={[
        { color: resolvedColor },
        styles.base,
        typeStyle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: FontFamily.regular,
  },
  default: {
    fontSize: Typography.fontSize.md,
    lineHeight: Math.round(
      Typography.fontSize.md * Typography.lineHeight.normal,
    ),
  },
  defaultSemiBold: {
    fontSize: Typography.fontSize.md,
    lineHeight: Math.round(
      Typography.fontSize.md * Typography.lineHeight.normal,
    ),
    fontFamily: FontFamily.semibold,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: FontFamily.bold,
    lineHeight: Math.round(
      Typography.fontSize.xxxl * Typography.lineHeight.tight,
    ),
  },
  subtitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: FontFamily.bold,
    lineHeight: Math.round(
      Typography.fontSize.xl * Typography.lineHeight.tight,
    ),
  },
  link: {
    fontSize: Typography.fontSize.md,
    lineHeight: Math.round(
      Typography.fontSize.md * Typography.lineHeight.normal,
    ),
    fontFamily: FontFamily.medium,
  },
  overline: {
    ...TypeStyles.overline,
    lineHeight: Math.round(
      Typography.fontSize.sm * Typography.lineHeight.normal,
    ),
  },
  caption: {
    ...TypeStyles.listRowMeta,
    lineHeight: Math.round(
      Typography.fontSize.sm * Typography.lineHeight.normal,
    ),
  },
  muted: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.regular,
    lineHeight: Math.round(
      Typography.fontSize.sm * Typography.lineHeight.normal,
    ),
  },
  rowTitle: {
    ...TypeStyles.listRowTitle,
    lineHeight: Math.round(
      Typography.fontSize.md * Typography.lineHeight.normal,
    ),
  },
  similarity: {
    ...TypeStyles.similarityBadge,
  },
});
