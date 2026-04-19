import React from "react";
import { StyleSheet, TouchableOpacity, type StyleProp, type ViewStyle } from "react-native";

import { Accent, BorderRadius, Shadows } from "@/constants/theme";

export type FloatingActionButtonProps = {
  onPress: () => void;
  icon: React.ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function FloatingActionButton({
  onPress,
  icon,
  accessibilityLabel,
  style,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.8}
      style={[styles.fab, style]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Accent.primary,
    ...Shadows.neonGlow,
    ...Shadows.lg,
  },
});
