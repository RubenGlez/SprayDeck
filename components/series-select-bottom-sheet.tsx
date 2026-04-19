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
import { Accent, Spacing, Surface, Typography } from "@/constants/theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import type { SeriesWithCountAndBrand } from "@/types";

export type SeriesSelectBottomSheetRef = BottomSheetModal;

type Props = {
  series: SeriesWithCountAndBrand[];
  selectedSeriesIds: Set<string>;
  onToggleSeries: (seriesId: string) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
};

export const SeriesSelectBottomSheet = forwardRef<
  SeriesSelectBottomSheetRef,
  Props
>(function SeriesSelectBottomSheet(
  { series, selectedSeriesIds, onToggleSeries, onSelectAll, onClear },
  ref,
) {
  const { t } = useTranslation();
  const favoriteSeriesIds = useFavoritesStore((s) => s.favoriteSeriesIds);
  const toggleFavoriteSeries = useFavoritesStore((s) => s.toggleFavoriteSeries);

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      backgroundStyle={{
        backgroundColor: Surface.low,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <ThemedText
          style={[styles.sectionLabel, { color: Accent.onSurfaceMuted }]}
        >
          {t("palettes.selectSeries")}
        </ThemedText>
        <ThemedText
          style={[styles.sectionSubtitle, { color: Accent.onSurfaceMuted }]}
        >
          {t("palettes.selectSeriesSubtitle")}
        </ThemedText>
        <View style={styles.seriesList}>
          {(onSelectAll != null || onClear != null) && (
            <View
              style={[
                styles.seriesRow,
                styles.selectAllRow,
                { borderBottomColor: Accent.outlineVariant },
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
                      color={Accent.primary}
                    />
                  ) : (
                    <IconSymbol name="square" size={24} color={Accent.onSurfaceMuted} />
                  )}
                  <View style={styles.seriesLabelWrap}>
                    <ThemedText style={styles.seriesName} numberOfLines={1}>
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
                  <ThemedText
                    style={[styles.clearLabel, { color: Accent.primary }]}
                    numberOfLines={1}
                  >
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
                style={[styles.seriesRow, { borderBottomColor: Accent.outlineVariant }]}
                onPress={() => onToggleSeries(s.id)}
                activeOpacity={0.7}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
              >
                {isSelected ? (
                  <IconSymbol
                    name="checkmark.square.fill"
                    size={24}
                    color={Accent.primary}
                  />
                ) : (
                  <IconSymbol name="square" size={24} color={Accent.onSurfaceMuted} />
                )}
                <View style={styles.seriesLabelWrap}>
                  <ThemedText
                    style={styles.seriesName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {s.name}
                  </ThemedText>
                  <ThemedText
                    style={[styles.seriesMeta, { color: Accent.onSurfaceMuted }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {s.brandName} ·{" "}
                    {t("colors.colorCount", { count: s.colorCount })}
                  </ThemedText>
                </View>
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
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
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
  clearLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
  },
  seriesLabelWrap: {
    flex: 1,
    marginLeft: Spacing.sm,
    minWidth: 0,
  },
  seriesName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  seriesMeta: {
    fontSize: Typography.fontSize.sm,
    marginTop: 2,
  },
  favoriteBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.xs,
  },
});
