import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, FontFamily, Spacing, Typography } from "@/constants/theme";

export function SwipeableDeleteAction({ onDelete }: { onDelete: () => void }) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={onDelete}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={t("common.delete")}
    >
      <IconSymbol name="trash.fill" size={20} color={Accent.onSurface} />
      <ThemedText style={styles.deleteActionText}>{t("common.delete")}</ThemedText>
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
