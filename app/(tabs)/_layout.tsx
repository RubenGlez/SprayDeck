import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BorderRadius, FontFamily, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function TabLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const bottomPad = Math.max(insets.bottom, Spacing.sm);
  const tabBarHeight = 56 + bottomPad;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.card,
            height: tabBarHeight,
            paddingBottom: bottomPad,
            paddingTop: Spacing.sm,
            borderTopColor: theme.border,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
              },
              android: { elevation: 12 },
            }),
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={26}
              name={focused ? "house.fill" : "house"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: t("tabs.catalog"),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={26}
              name={focused ? "square.grid.2x2.fill" : "square.grid.2x2"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="palettes"
        options={{
          title: t("tabs.palettes"),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={26}
              name={focused ? "paintpalette.fill" : "paintpalette"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="doodles"
        options={{
          title: t("tabs.doodles"),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={26}
              name={focused ? "square.stack.3d.up.fill" : "square.stack.3d.up"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={26}
              name={focused ? "person.fill" : "person"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
  },
  tabBarItem: {
    paddingTop: 2,
  },
  tabLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
