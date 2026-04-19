import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol, type IconSymbolName } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, FontFamily, Spacing, Surface, Typography } from "@/constants/theme";

export type EmptyStateCardProps = {
  icon: IconSymbolName;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function EmptyStateCard({ icon, title, subtitle, onPress }: EmptyStateCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={onPress}>
      <View style={styles.iconWrap}>
        <IconSymbol name={icon} size={26} color={Accent.primary} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      <View style={styles.cta}>
        <ThemedText style={styles.ctaText}>Get started</ThemedText>
        <IconSymbol name="arrow.right" size={14} color={Accent.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Surface.base,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    minHeight: 160,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${Accent.primary}18`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
  title: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.md,
    color: Accent.onSurface,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Accent.onSurfaceMuted,
    textAlign: "center",
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  ctaText: {
    fontSize: Typography.fontSize.sm,
    color: Accent.primary,
    fontFamily: FontFamily.displayMedium,
  },
});
