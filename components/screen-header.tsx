import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Accent, Spacing, Typography } from "@/constants/theme";

type ScreenHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
};

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleRow}>
        <ThemedText type="title" style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
        {right != null && <View style={styles.rightSlot}>{right}</View>}
      </View>

      {subtitle != null && (
        <ThemedText style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 2,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Accent.onSurfaceMuted,
    marginTop: 2,
  },
  rightSlot: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
