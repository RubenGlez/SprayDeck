import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import {
  ColorDetailBottomSheet,
  type ColorDetailBottomSheetRef,
  type ColorDetailParams,
} from "@/components/color-detail-bottom-sheet";
import { ColorGridCard } from "@/components/color-grid-card";
import { Screen } from "@/components/screen";
import { ScreenHeader } from "@/components/screen-header";
import { SearchInput } from "@/components/search-input";
import {
  SeriesSelectBottomSheet,
  type SeriesSelectBottomSheetRef,
} from "@/components/series-select-bottom-sheet";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { COLOR_GRID } from "@/constants/color-grid";
import { Accent, BorderRadius, FontFamily, Spacing, Surface, Typography } from "@/constants/theme";
import { useSeriesColorSelection } from "@/hooks/use-series-color-selection";
import { filterColorsBySearch, getColorDisplayName } from "@/lib/color";
import { getBrandById, getBrandsWithCount, getSeriesById, getSeriesWithCountByBrandId } from "@/stores/useCatalogStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import type { Color } from "@/types";

const { NUM_COLUMNS, GAP, CARD_WIDTH, SWATCH_SIZE } = COLOR_GRID;
const ALL_BRAND_ID = "__all__";

export default function CatalogScreen() {
  const { t, i18n } = useTranslation();
  const {
    allSeries,
    selectedSeriesIds,
    setSelectedSeriesIds,
    toggleSeriesSelection,
    allColors,
  } = useSeriesColorSelection();

  const brands = useMemo(() => getBrandsWithCount(), []);
  const [activeBrandId, setActiveBrandId] = useState<string>(ALL_BRAND_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [detailParams, setDetailParams] = useState<ColorDetailParams | null>(null);
  const detailSheetRef = useRef<ColorDetailBottomSheetRef>(null);
  const seriesFilterSheetRef = useRef<SeriesSelectBottomSheetRef>(null);

  const favoriteColorIds = useFavoritesStore((s) => s.favoriteColorIds);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleBrandChip = useCallback((brandId: string) => {
    setActiveBrandId(brandId);
    if (brandId === ALL_BRAND_ID) {
      setSelectedSeriesIds(new Set(allSeries.map((s) => s.id)));
    } else {
      const brandSeries = getSeriesWithCountByBrandId(brandId);
      setSelectedSeriesIds(new Set(brandSeries.map((s) => s.id)));
    }
  }, [allSeries, setSelectedSeriesIds]);

  const filteredColors = useMemo(() => {
    let list = allColors;
    if (showOnlyFavorites) list = list.filter((c) => favoriteColorIds.includes(c.id));
    return filterColorsBySearch(list, searchQuery, i18n.language);
  }, [allColors, searchQuery, showOnlyFavorites, favoriteColorIds, i18n.language]);

  const handleFavorite = useCallback((color: Color) => toggleFavorite(color.id), [toggleFavorite]);

  const openDetailSheet = useCallback(
    (item: Color) => {
      const s = getSeriesById(item.seriesId);
      const brand = s ? getBrandById(s.brandId) : undefined;
      setDetailParams({
        color: item,
        displayName: getColorDisplayName(item, i18n.language),
        brandName: brand?.name ?? t("common.notAvailable"),
        seriesName: s?.name ?? t("common.notAvailable"),
      });
      detailSheetRef.current?.present();
    },
    [i18n.language, t],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Color; index: number }) => (
      <View
        style={{
          width: CARD_WIDTH,
          marginRight: index % NUM_COLUMNS === NUM_COLUMNS - 1 ? 0 : GAP,
        }}
      >
        <ColorGridCard
          color={item}
          displayName={getColorDisplayName(item, i18n.language)}
          onPress={() => openDetailSheet(item)}
          isFavorite={favoriteColorIds.includes(item.id)}
          onFavorite={() => handleFavorite(item)}
          cardWidth={CARD_WIDTH}
          swatchSize={SWATCH_SIZE}
        />
      </View>
    ),
    [i18n.language, favoriteColorIds, openDetailSheet, handleFavorite],
  );

  const activeCount = selectedSeriesIds.size;
  const totalCount = allSeries.length;

  const listHeader = (
    <View>
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("catalog.searchPlaceholder")}
        clearAccessibilityLabel={t("common.clear")}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipContent}
      >
        <BrandChip
          label="All"
          active={activeBrandId === ALL_BRAND_ID}
          onPress={() => handleBrandChip(ALL_BRAND_ID)}
        />
        {brands.map((brand) => (
          <BrandChip
            key={brand.id}
            label={brand.name}
            active={activeBrandId === brand.id}
            onPress={() => handleBrandChip(brand.id)}
          />
        ))}
        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => seriesFilterSheetRef.current?.present()}
        >
          <IconSymbol name="slider.horizontal.3" size={14} color={Accent.onSurfaceMuted} />
          <ThemedText style={styles.filterChipText}>
            {activeCount}/{totalCount}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <ScreenHeader
            title={t("catalog.overviewTitle")}
            right={
              <TouchableOpacity
                onPress={() => setShowOnlyFavorites((s) => !s)}
                style={styles.favBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel={showOnlyFavorites ? t("catalog.showAllColors") : t("catalog.showOnlyFavorites")}
              >
                <IconSymbol
                  name={showOnlyFavorites ? "star.fill" : "star"}
                  size={22}
                  color={showOnlyFavorites ? Accent.primary : Accent.onSurfaceMuted}
                />
              </TouchableOpacity>
            }
          />
          <FlatList
            data={filteredColors}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={NUM_COLUMNS}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={listHeader}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Screen>

      <ColorDetailBottomSheet
        ref={detailSheetRef}
        color={detailParams}
        isFavorite={detailParams ? favoriteColorIds.includes(detailParams.color.id) : false}
        onToggleFavorite={() => detailParams && handleFavorite(detailParams.color)}
        onOpenColor={openDetailSheet}
      />

      <SeriesSelectBottomSheet
        ref={seriesFilterSheetRef}
        series={allSeries}
        selectedSeriesIds={selectedSeriesIds}
        onToggleSeries={toggleSeriesSelection}
        onSelectAll={() => setSelectedSeriesIds(new Set(allSeries.map((s) => s.id)))}
        onClear={() => setSelectedSeriesIds(new Set())}
      />
    </>
  );
}

function BrandChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedText style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  favBtn: {
    padding: Spacing.xs,
  },
  chipScroll: {
    marginBottom: Spacing.sm,
  },
  chipContent: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Surface.high,
  },
  chipActive: {
    backgroundColor: `${Accent.primary}22`,
  },
  chipText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: FontFamily.displayMedium,
    color: Accent.onSurfaceMuted,
  },
  chipTextActive: {
    color: Accent.primary,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Surface.high,
  },
  filterChipText: {
    fontSize: Typography.fontSize.xs,
    color: Accent.onSurfaceMuted,
    fontFamily: FontFamily.displayMedium,
  },
  listContent: {
    paddingTop: GAP,
    paddingBottom: Spacing.sm,
  },
  row: {
    marginBottom: Spacing.sm,
  },
});
