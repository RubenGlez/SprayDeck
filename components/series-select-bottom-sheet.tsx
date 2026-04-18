import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { FavoriteIcon } from "@/components/favorite-icon";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  SHEET_BACKDROP_OPACITY,
  sheetModalBackground,
} from "@/constants/ui-primitives";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import type { SeriesWithCountAndBrand } from "@/types";

export type SeriesSelectBottomSheetRef = BottomSheetModal;

type Props = {
  series: SeriesWithCountAndBrand[];
  selectedSeriesIds: Set<string>;
  onToggleSeries: (seriesId: string) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  /** When false, hides per-row favorite star (e.g. import-from-image flow). Default true. */
  showFavorites?: boolean;
  /** Fixed heights; omit for dynamic sheet height. */
  snapPoints?: (string | number)[];
};

export const SeriesSelectBottomSheet = forwardRef<
  SeriesSelectBottomSheetRef,
  Props
>(function SeriesSelectBottomSheet(
  {
    series,
    selectedSeriesIds,
    onToggleSeries,
    onSelectAll,
    onClear,
    showFavorites = true,
    snapPoints,
  },
  ref,
) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const favoriteSeriesIds = useFavoritesStore((s) => s.favoriteSeriesIds);
  const toggleFavoriteSeries = useFavoritesStore((s) => s.toggleFavoriteSeries);

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

  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={sheetModalBackground(theme)}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={snapPoints == null}
      {...(snapPoints != null ? { snapPoints } : {})}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <ThemedText type="overline" style={styles.sectionLabel}>
          {t("palettes.selectSeries")}
        </ThemedText>
        <ThemedText type="caption" style={styles.sectionSubtitle}>
          {t("palettes.selectSeriesSubtitle")}
        </ThemedText>
        <View style={styles.seriesList}>
          {(onSelectAll != null || onClear != null) && (
            <View
              style={[
                styles.seriesRow,
                styles.selectAllRow,
                { borderBottomColor: theme.border },
              ]}
            >
              {onSelectAll != null ? (
                <TouchableOpacity
                  style={styles.selectAllLeft}
                  onPress={onSelectAll}
                  activeOpacity={0.7}
                  accessibilityRole="checkbox"
                  accessibilityState={{
                    checked:
                      series.length > 0 &&
                      selectedSeriesIds.size === series.length,
                  }}
                  accessibilityLabel={t("palettes.selectAll")}
                >
                  {series.length > 0 &&
                  selectedSeriesIds.size === series.length ? (
                    <IconSymbol
                      name="checkmark.square.fill"
                      size={24}
                      color={theme.tint}
                    />
                  ) : (
                    <IconSymbol name="square" size={24} color={theme.icon} />
                  )}
                  <View style={styles.seriesLabelWrap}>
                    <ThemedText type="rowTitle" numberOfLines={1}>
                      {t("palettes.selectAll")}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.seriesLabelWrap} />
              )}
              {onClear != null && (
                <TouchableOpacity
                  onPress={onClear}
                  activeOpacity={0.7}
                  style={styles.clearBtn}
                  accessibilityLabel={t("palettes.clearSelection")}
                >
                  <ThemedText type="link" numberOfLines={1}>
                    {t("palettes.clearSelection")}
                  </ThemedText>
                </TouchableOpacity>
              )}
            </View>
          )}
          {series.map((s) => {
            const isSelected = selectedSeriesIds.has(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.seriesRow, { borderBottomColor: theme.border }]}
                onPress={() => onToggleSeries(s.id)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
              >
                {isSelected ? (
                  <IconSymbol
                    name="checkmark.square.fill"
                    size={24}
                    color={theme.tint}
                  />
                ) : (
                  <IconSymbol name="square" size={24} color={theme.icon} />
                )}
                <View style={styles.seriesLabelWrap}>
                  <ThemedText type="rowTitle" numberOfLines={1} ellipsizeMode="tail">
                    {s.name}
                  </ThemedText>
                  <ThemedText
                    type="caption"
                    style={styles.seriesMeta}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {s.brandName} ·{" "}
                    {t("colors.colorCount", { count: s.colorCount })}
                  </ThemedText>
                </View>
                {showFavorites ? (
                  <TouchableOpacity
                    style={styles.favoriteBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleFavoriteSeries(s.id);
                    }}
                    accessibilityLabel={
                      favoriteSeriesIds.includes(s.id)
                        ? t("colors.removeFromFavorites")
                        : t("colors.addToFavorites")
                    }
                    accessibilityRole="button"
                  >
                    <FavoriteIcon
                      isFavorite={favoriteSeriesIds.includes(s.id)}
                      size={22}
                    />
                  </TouchableOpacity>
                ) : null}
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
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    marginBottom: Spacing.md,
  },
  seriesList: {
    marginBottom: Spacing.lg,
  },
  seriesRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  selectAllRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectAllLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  clearBtn: {
    paddingVertical: Spacing.xs,
    paddingLeft: Spacing.sm,
  },
  seriesLabelWrap: {
    flex: 1,
    marginLeft: Spacing.sm,
    minWidth: 0,
  },
  seriesMeta: {
    marginTop: 2,
  },
  favoriteBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.xs,
  },
});
