import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Button } from "@/components/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/theme";
import { themedTextInput } from "@/constants/ui-primitives";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme } = useTheme();

  return (
    <View style={styles.wrap}>
      <TextInput
        style={[themedTextInput(theme), styles.input]}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
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
              size={22}
              color={theme.textSecondary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    marginBottom: Spacing.md,
  },
  input: {
    height: 44,
    paddingRight: 44,
  },
  clearBtn: {
    position: "absolute",
    right: Spacing.sm,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    padding: Spacing.xs,
  },
});
