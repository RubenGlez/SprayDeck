import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Button } from "@/components/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Accent, BorderRadius, Spacing, Surface, Typography } from "@/constants/theme";

export type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  clearAccessibilityLabel: string;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  clearAccessibilityLabel,
}: SearchInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrap, focused && styles.wrapFocused]}>
      <IconSymbol
        name="magnifyingglass"
        size={17}
        color={focused ? Accent.primary : Accent.onSurfaceMuted}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Accent.onSurfaceMuted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={Accent.primary}
      />
      {value.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          style={styles.clearBtn}
          onPress={() => onChangeText("")}
          accessibilityLabel={clearAccessibilityLabel}
          icon={
            <IconSymbol
              name="xmark.circle.fill"
              size={18}
              color={Accent.onSurfaceMuted}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Surface.highest,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    height: 46,
    gap: Spacing.sm,
  },
  wrapFocused: {
    shadowColor: Accent.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    color: Accent.onSurface,
    fontSize: Typography.fontSize.md,
    paddingVertical: 0,
  },
  clearBtn: {
    marginRight: -Spacing.xs,
  },
});
