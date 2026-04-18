import { useCallback, useState } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { themedTextInput } from "@/constants/ui-primitives";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextInputProps = TextInputProps & {
  /** Minimum height / touch target; default 44 */
  minInputHeight?: number;
};

export function ThemedTextInput({
  style,
  minInputHeight = 44,
  onFocus,
  onBlur,
  ...rest
}: ThemedTextInputProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur: NonNullable<TextInputProps["onBlur"]> = useCallback(
    (e) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const base = themedTextInput(theme, { minHeight: minInputHeight });

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      selectionColor={theme.tint}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        base,
        { borderColor: focused ? theme.tint : theme.border },
        style,
      ]}
      {...rest}
    />
  );
}
