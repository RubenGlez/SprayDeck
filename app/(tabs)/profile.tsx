import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Switch, View } from "react-native";

import {
  LanguageSelectBottomSheet,
  type LanguageSelectBottomSheetRef,
} from "@/components/language-select-bottom-sheet";
import { Screen } from "@/components/screen";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FontFamily, Spacing, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useThemeStore } from "@/stores/useThemeStore";
import type { LanguageCode } from "@/types";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { theme, isDark } = useTheme();
  const aka = useProfileStore((s) => s.aka);
  const setAka = useProfileStore((s) => s.setAka);
  const setColorSchemeOverride = useThemeStore((s) => s.setColorSchemeOverride);
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const languageSheetRef = useRef<LanguageSelectBottomSheetRef>(null);

  const currentLang = language ?? i18n.language.split("-")[0];
  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    languageSheetRef.current?.dismiss();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ScreenHeader title={t("tabs.profile")} />

        <View style={[styles.section, { borderTopWidth: 0 }]}>
          <ThemedText type="overline" style={styles.sectionLabel}>
            {t("profile.akaSection")}
          </ThemedText>
          <ThemedTextInput
            style={styles.akaInput}
            minInputHeight={48}
            placeholder={t("profile.akaPlaceholder")}
            value={aka}
            onChangeText={setAka}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <ThemedText style={[styles.akaHint, { color: theme.textSecondary }]}>
            {t("profile.akaHint")}
          </ThemedText>
        </View>

        <View style={[styles.section, { borderTopColor: theme.border }]}>
          <ThemedText type="overline" style={styles.sectionLabel}>
            {t("profile.language")}
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.languageRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => languageSheetRef.current?.present()}
          >
            <ThemedText style={styles.rowLabel}>
              {t(`profile.lang_${currentLang}` as const)}
            </ThemedText>
            <IconSymbol
              name="chevron.right"
              size={20}
              color={theme.textSecondary}
            />
          </Pressable>
        </View>

        <LanguageSelectBottomSheet
          ref={languageSheetRef}
          currentLanguage={currentLang}
          onSelectLanguage={handleSelectLanguage}
        />

        <View style={[styles.section, { borderTopColor: theme.border }]}>
          <ThemedText type="overline" style={styles.sectionLabel}>
            {t("profile.appearance")}
          </ThemedText>
          <View style={[styles.row, { borderBottomColor: theme.border }]}>
            <ThemedText style={styles.rowLabel}>
              {t("profile.darkMode")}
            </ThemedText>
            <Switch
              value={isDark}
              onValueChange={(value) =>
                setColorSchemeOverride(value ? "dark" : "light")
              }
              trackColor={{ false: theme.border, true: theme.tint }}
              thumbColor={theme.background}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  section: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
  },
  sectionLabel: {
    marginBottom: Spacing.sm,
  },
  akaInput: {
    marginBottom: Spacing.xs,
  },
  akaHint: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
  },
});
