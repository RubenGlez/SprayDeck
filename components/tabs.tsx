import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Accent, BorderRadius, Spacing, Surface, Typography } from "@/constants/theme";

const TAB_BAR_HEIGHT = 48;

export type TabItem = {
  value: string;
  label: string;
  /** Optional static icon */
  icon?: React.ReactNode;
  /** Optional icon with selected state (use for dynamic color) */
  renderIcon?: (selected: boolean) => React.ReactNode;
};

export type TabsProps = {
  value: string;
  onChange: (value: string) => void;
  tabs: TabItem[];
};

export function Tabs({ value, onChange, tabs }: TabsProps) {
  return (
    <View style={styles.tabBar}>
      <View style={styles.tabTrack}>
        {tabs.map((tab) => {
          const isSelected = value === tab.value;
          return (
            <TouchableOpacity
              key={tab.value}
              style={[styles.tab, isSelected && styles.tabSelected]}
              onPress={() => onChange(tab.value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={tab.label}
            >
              {(tab.renderIcon != null || tab.icon != null) && (
                <View style={styles.tabIconWrap}>
                  {tab.renderIcon != null
                    ? tab.renderIcon(isSelected)
                    : tab.icon}
                </View>
              )}
              <ThemedText
                style={[
                  styles.tabLabel,
                  { color: isSelected ? Accent.primary : Accent.onSurfaceMuted },
                ]}
              >
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  tabTrack: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Surface.high,
    borderRadius: BorderRadius.full,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  tabSelected: {
    backgroundColor: Surface.bright,
  },
  tabIconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
});
