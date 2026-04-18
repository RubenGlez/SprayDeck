import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FontFamily, Spacing, Typography } from "@/constants/theme";
import {
  SHEET_BACKDROP_OPACITY,
  sheetModalBackground,
} from "@/constants/ui-primitives";
import { useTheme } from "@/hooks/use-theme";
import { SUPPORTED_LANGUAGES } from "@/stores/useLanguageStore";
import type { LanguageCode } from "@/types";

export type LanguageSelectBottomSheetRef = BottomSheetModal;

type Props = {
  currentLanguage: string;
  onSelectLanguage: (code: LanguageCode) => void;
};

export const LanguageSelectBottomSheet = forwardRef<
  LanguageSelectBottomSheetRef,
  Props
>(function LanguageSelectBottomSheet(
  { currentLanguage, onSelectLanguage },
  ref,
) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={SHEET_BACKDROP_OPACITY}
      />
    ),
    [],
  );

  const handleSelect = useCallback(
    (code: LanguageCode) => {
      onSelectLanguage(code);
    },
    [onSelectLanguage],
  );

  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={sheetModalBackground(theme)}
      backdropComponent={renderBackdrop}
      enableDynamicSizing
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <ThemedText type="overline" style={styles.sectionLabel}>
          {t("profile.language")}
        </ThemedText>
        <View style={styles.list}>
          {SUPPORTED_LANGUAGES.map((code) => {
            const isSelected = currentLanguage === code;
            return (
              <TouchableOpacity
                key={code}
                style={[styles.row, { borderBottomColor: theme.border }]}
                onPress={() => handleSelect(code)}
                activeOpacity={0.7}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
              >
                <ThemedText style={styles.rowLabel}>
                  {t(`profile.lang_${code}` as const)}
                </ThemedText>
                {isSelected && (
                  <IconSymbol
                    name="checkmark.circle.fill"
                    size={22}
                    color={theme.tint}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl * 2,
  },
  sectionLabel: {
    marginBottom: Spacing.md,
  },
  list: {
    marginBottom: Spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: FontFamily.regular,
  },
});
