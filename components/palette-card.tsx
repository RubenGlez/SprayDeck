import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { getListCardWidth, LIST_GAP } from "@/constants/list-layout";
import { Accent, BorderRadius, FontFamily, Spacing, Surface, Typography } from "@/constants/theme";
import { getSeriesById } from "@/stores/useCatalogStore";
import type { Color, Palette } from "@/types";

const CARD_WIDTH = getListCardWidth();
const CARD_PADDING = Spacing.md;
const SWATCH_ROW_HEIGHT = 48;
const SWATCH_SIZE = SWATCH_ROW_HEIGHT - 4;
const SWATCHES_TO_SHOW = 8;

export function PaletteCard({
  palette,
  onPress,
}: {
  palette: Palette;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const swatches = palette.colors.slice(0, SWATCHES_TO_SHOW) as Color[];
  const extraCount =
    palette.colors.length > SWATCHES_TO_SHOW
      ? palette.colors.length - SWATCHES_TO_SHOW
      : 0;

  const mainSeries = useMemo(() => {
    if (!palette.colors.length) return null;
    const counts: Record<string, number> = {};
    for (const c of palette.colors) {
      counts[c.seriesId] = (counts[c.seriesId] ?? 0) + 1;
    }
    let bestId: string | null = null;
    let bestCount = 0;
    for (const [id, count] of Object.entries(counts)) {
      if (count > bestCount) { bestCount = count; bestId = id; }
    }
    return bestId ? getSeriesById(bestId) ?? null : null;
  }, [palette.colors]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
    >
      {/* Color swatch strip */}
      <View style={styles.swatchRow}>
        {swatches.length > 0 ? (
          <>
            {swatches.map((c) => (
              <View
                key={c.id}
                style={[styles.swatch, { backgroundColor: c.hex }]}
              />
            ))}
            {extraCount > 0 && (
              <View style={styles.swatchMore}>
                <ThemedText style={styles.swatchMoreText}>
                  +{extraCount}
                </ThemedText>
              </View>
            )}
          </>
        ) : (
          <View style={styles.swatchPlaceholder}>
            <IconSymbol
              name="swatchpalette"
              size={20}
              color={Accent.onSurfaceMuted}
            />
          </View>
        )}
      </View>

      <View style={styles.meta}>
        <View style={styles.textStack}>
          {mainSeries?.name ? (
            <ThemedText style={styles.seriesLabel} numberOfLines={1}>
              {mainSeries.name}
            </ThemedText>
          ) : null}
          <ThemedText style={styles.cardTitle} numberOfLines={1}>
            {palette.name || t("common.untitled")}
          </ThemedText>
        </View>
        <ThemedText style={styles.countBadge}>
          {palette.colors.length}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Surface.base,
    borderRadius: BorderRadius.lg,
    marginBottom: LIST_GAP,
    overflow: "hidden",
  },
  swatchRow: {
    flexDirection: "row",
    height: SWATCH_ROW_HEIGHT,
  },
  swatch: {
    flex: 1,
    minWidth: SWATCH_SIZE / 2,
  },
  swatchPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Surface.high,
  },
  swatchMore: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Surface.high,
  },
  swatchMoreText: {
    fontSize: Typography.fontSize.xs,
    color: Accent.onSurfaceMuted,
    fontWeight: Typography.fontWeight.semibold,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: CARD_PADDING,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
  },
  textStack: {
    flex: 1,
    gap: 1,
  },
  seriesLabel: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.xs,
    color: Accent.onSurfaceMuted,
    textTransform: "uppercase",
    letterSpacing: Typography.letterSpacing.label,
  },
  cardTitle: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.md,
    color: Accent.onSurface,
  },
  countBadge: {
    fontFamily: FontFamily.displayBold,
    fontSize: Typography.fontSize.lg,
    color: Accent.primary,
    opacity: 0.6,
  },
});
