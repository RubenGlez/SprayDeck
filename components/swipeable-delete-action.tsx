import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, FontFamily, Spacing, Typography } from "@/constants/theme";

export function SwipeableDeleteAction({ onDelete }: { onDelete: () => void }) {
  return (
    <TouchableOpacity style={styles.deleteAction} onPress={onDelete} activeOpacity={0.8}>
      <IconSymbol name="trash.fill" size={20} color={Accent.onSurface} />
      <ThemedText style={styles.deleteActionText}>Delete</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: Accent.error,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    gap: 4,
  },
  deleteActionText: {
    color: Accent.onSurface,
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.displaySemiBold,
  },
});
