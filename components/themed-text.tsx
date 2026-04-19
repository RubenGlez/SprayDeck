import { StyleSheet, Text, type TextProps } from 'react-native';

import { Accent, FontFamily, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'label' | 'display';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'label' ? styles.label : undefined,
        type === 'display' ? styles.display : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // System font — body / readable content
  default: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.normal,
    color: Accent.onSurface,
  },
  defaultSemiBold: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.normal,
    fontWeight: Typography.fontWeight.semibold,
    color: Accent.onSurface,
  },
  link: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
    color: Accent.primary,
  },
  label: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.label,
    color: Accent.onSurfaceMuted,
  },

  // Space Grotesk — decorative headings
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: Typography.fontSize.xxxl,
    lineHeight: Typography.fontSize.xxxl * Typography.lineHeight.tight,
    letterSpacing: Typography.letterSpacing.tight,
    color: Accent.onSurface,
  },
  subtitle: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.fontSize.xl * Typography.lineHeight.tight,
    letterSpacing: Typography.letterSpacing.tight,
    color: Accent.onSurface,
  },
  display: {
    fontFamily: FontFamily.displayBold,
    fontSize: Typography.fontSize.display,
    lineHeight: Typography.fontSize.display * Typography.lineHeight.tight,
    letterSpacing: Typography.letterSpacing.tight,
    color: Accent.onSurface,
  },
});
