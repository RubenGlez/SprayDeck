import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/button";
import { ThemedText } from "@/components/themed-text";
import { BorderRadius, FontFamily, Spacing, Typography } from "@/constants/theme";
import { themedTextInput } from "@/constants/ui-primitives";
import { useTheme } from "@/hooks/use-theme";

export type SaveNameModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel: string;
  saveLabel: string;
};

export function SaveNameModal({
  visible,
  onRequestClose,
  title,
  placeholder,
  value,
  onChangeText,
  onCancel,
  onConfirm,
  cancelLabel,
  saveLabel,
}: SaveNameModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onRequestClose}
        />
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <ThemedText style={styles.title}>{title}</ThemedText>
          <TextInput
            style={[themedTextInput(theme), styles.input]}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            value={value}
            onChangeText={onChangeText}
            autoFocus
          />
          <View style={styles.actions}>
            <Button variant="outline" size="md" onPress={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant="primary" size="md" onPress={onConfirm}>
              {saveLabel}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    zIndex: 1,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontFamily: FontFamily.semibold,
    marginBottom: Spacing.md,
  },
  input: {
    height: 44,
    marginBottom: Spacing.lg,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
    justifyContent: "flex-end",
  },
});
