import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { getListCardWidth, LIST_GAP } from "@/constants/list-layout";
import { Accent, BorderRadius, Shadows, Spacing, Surface, Typography } from "@/constants/theme";
import { formatRelativeDate } from "@/lib/date";
import type { Doodle } from "@/types";

const CARD_WIDTH = getListCardWidth();
const CARD_PADDING = Spacing.md;
const THUMBNAIL_ASPECT = 4 / 3;
const THUMBNAIL_HEIGHT = (CARD_WIDTH - CARD_PADDING * 2) / THUMBNAIL_ASPECT;

export function DoodleCard({
  doodle,
  onPress,
}: {
  doodle: Doodle;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const thumbnailUri =
    doodle.thumbnailUri ??
    doodle.exportImageUri ??
    doodle.sketchImageUri ??
    doodle.wallImageUri;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: Surface.high }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.thumbnailWrap,
          { backgroundColor: Surface.highest },
        ]}
      >
        {thumbnailUri ? (
          <Image
            source={{ uri: thumbnailUri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnailPlaceholder}>
            <IconSymbol
              name="paintbrush"
              size={28}
              color={Accent.onSurfaceMuted}
            />
          </View>
        )}
      </View>
      <ThemedText style={styles.cardTitle} numberOfLines={1}>
        {doodle.name || t("common.untitled")}
      </ThemedText>
      <ThemedText style={[styles.cardDate, { color: Accent.onSurfaceMuted }]}>
        {formatRelativeDate(doodle.createdAt)}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    padding: CARD_PADDING,
    borderRadius: BorderRadius.lg,
    marginBottom: LIST_GAP,
    ...Shadows.sm,
  },
  thumbnailWrap: {
    width: CARD_WIDTH - CARD_PADDING * 2,
    height: THUMBNAIL_HEIGHT,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    marginBottom: Spacing.sm,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  cardDate: {
    fontSize: Typography.fontSize.xs,
  },
});
