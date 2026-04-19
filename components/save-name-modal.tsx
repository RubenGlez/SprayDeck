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
import { Accent, BorderRadius, FontFamily, Shadows, Spacing, Surface, Typography } from "@/constants/theme";

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
        <View style={styles.card}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Accent.onSurfaceMuted}
            value={value}
            onChangeText={onChangeText}
            selectionColor={Accent.primary}
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  card: {
    backgroundColor: Surface.highest,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    zIndex: 1,
    ...Shadows.neonGlow,
  },
  title: {
    fontFamily: FontFamily.displaySemiBold,
    fontSize: Typography.fontSize.lg,
    marginBottom: Spacing.md,
    color: Accent.onSurface,
  },
  input: {
    height: 48,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Surface.highest,
    fontSize: Typography.fontSize.md,
    marginBottom: Spacing.lg,
    color: Accent.onSurface,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
    justifyContent: "flex-end",
  },
});
