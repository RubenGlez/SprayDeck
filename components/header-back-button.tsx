import type { ReactNode } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, FontFamily, Spacing, Typography } from "@/constants/theme";

type HeaderBackButtonProps = {
  title?: string;
  right?: ReactNode;
};

export function HeaderBackButton({ title, right }: HeaderBackButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
        >
          <IconSymbol name="chevron.left" size={22} color={Accent.primary} />
        </TouchableOpacity>
        {title ? (
          <ThemedText style={styles.title} numberOfLines={1}>
            {title}
          </ThemedText>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
    paddingRight: Spacing.sm,
    paddingVertical: Spacing.sm,
    minHeight: 48,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    flexShrink: 1,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  title: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.lg,
    color: Accent.onSurface,
    flex: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
});
