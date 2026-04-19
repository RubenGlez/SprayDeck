import React from "react";
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle } from "react-native";
import { BlurView } from "@react-native-community/blur";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, Glass, Shadows, Spacing } from "@/constants/theme";

export type FloatingActionButtonProps = {
  onPress: () => void;
  icon: React.ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "glass";
};

export function FloatingActionButton({
  onPress,
  icon,
  accessibilityLabel,
  style,
  variant = "primary",
}: FloatingActionButtonProps) {
  const SIZE = 56;

  if (variant === "glass") {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        activeOpacity={0.8}
        style={[styles.fabBase, { width: SIZE, height: SIZE }, style]}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={Glass.blurAmount}
          reducedTransparencyFallbackColor={Glass.backgroundColor}
        />
        <View style={[StyleSheet.absoluteFill, styles.glassOverlay]} />
        {icon}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.8}
      style={[
        styles.fabBase,
        styles.fabPrimary,
        { width: SIZE, height: SIZE },
        Shadows.neonGlow,
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabBase: {
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...Shadows.lg,
  },
  fabPrimary: {
    backgroundColor: Accent.primary,
  },
  glassOverlay: {
    backgroundColor: `${Glass.backgroundColor}99`,
    borderRadius: BorderRadius.full,
  },
});
