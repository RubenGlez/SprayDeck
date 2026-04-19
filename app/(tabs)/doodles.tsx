import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { DoodleCard } from "@/components/doodle-card";
import { EmptyStateCard } from "@/components/empty-state-card";
import { FloatingActionButton } from "@/components/floating-action-button";
import { Screen } from "@/components/screen";
import { ScreenHeader } from "@/components/screen-header";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, FontFamily, Spacing, Typography } from "@/constants/theme";
import { useDoodlesStore } from "@/stores/useDoodlesStore";
import type { Doodle } from "@/types";

function SwipeableDeleteAction({ onDelete }: { onDelete: () => void }) {
  return (
    <TouchableOpacity style={styles.deleteAction} onPress={onDelete} activeOpacity={0.8}>
      <IconSymbol name="trash.fill" size={20} color="#fff" />
      <ThemedText style={styles.deleteActionText}>Delete</ThemedText>
    </TouchableOpacity>
  );
}

function SwipeableDoodleCard({
  doodle,
  onPress,
  onDelete,
}: {
  doodle: Doodle;
  onPress: () => void;
  onDelete: () => void;
}) {
  const swipeRef = useRef<Swipeable>(null);

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={() => (
        <SwipeableDeleteAction
          onDelete={() => {
            swipeRef.current?.close();
            onDelete();
          }}
        />
      )}
      rightThreshold={60}
      overshootRight={false}
    >
      <DoodleCard doodle={doodle} onPress={onPress} />
    </Swipeable>
  );
}

export default function DoodlesIndexScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const doodles = useDoodlesStore((s) => s.doodles);
  const removeDoodle = useDoodlesStore((s) => s.removeDoodle);

  const handleNewDoodle = () => router.push("/doodles/create");

  const handleDelete = (doodle: Doodle) => {
    Alert.alert(
      t("doodles.deleteTitle", { name: doodle.name }),
      t("doodles.deleteMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        { text: t("common.delete"), style: "destructive", onPress: () => removeDoodle(doodle.id) },
      ],
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ScreenHeader
          title={t("doodles.myDoodles")}
          subtitle={t("doodles.subtitle")}
        />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {doodles.length === 0 ? (
            <EmptyStateCard
              icon="paintbrush"
              title={t("doodles.emptyTitle")}
              subtitle={t("doodles.emptyHint")}
              onPress={handleNewDoodle}
            />
          ) : (
            <View style={styles.grid}>
              {doodles.map((doodle) => (
                <SwipeableDoodleCard
                  key={doodle.id}
                  doodle={doodle}
                  onPress={() => router.push({ pathname: "/doodles/create", params: { doodleId: doodle.id } })}
                  onDelete={() => handleDelete(doodle)}
                />
              ))}
            </View>
          )}
        </ScrollView>

        <FloatingActionButton
          style={styles.fab}
          onPress={handleNewDoodle}
          accessibilityLabel={t("doodles.newDoodle")}
          icon={<IconSymbol name="plus" size={26} color={Accent.onPrimary} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    bottom: Spacing.md,
    right: Spacing.md,
  },
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
    color: "#fff",
    fontSize: Typography.fontSize.xs,
    fontFamily: FontFamily.displaySemiBold,
  },
});
