import { StyleSheet, Text, type TextProps } from "react-native";

import { FontFamily, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  const linkColor = type === "link" ? theme.link : color;

  return (
    <Text
      style={[
        { color: linkColor },
        styles.base,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
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
    lineHeight: Math.round(Typography.fontSize.md * Typography.lineHeight.normal),
  },
  defaultSemiBold: {
    fontSize: Typography.fontSize.md,
    lineHeight: Math.round(Typography.fontSize.md * Typography.lineHeight.normal),
    fontFamily: FontFamily.semibold,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: FontFamily.bold,
    lineHeight: Math.round(Typography.fontSize.xxxl * Typography.lineHeight.tight),
  },
  subtitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: FontFamily.bold,
    lineHeight: Math.round(Typography.fontSize.xl * Typography.lineHeight.tight),
  },
  link: {
    fontSize: Typography.fontSize.md,
    lineHeight: Math.round(Typography.fontSize.md * Typography.lineHeight.normal),
    fontFamily: FontFamily.medium,
  },
});
