import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Surface } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean | 'top' | 'bottom' | 'horizontal';
};

export function ThemedView({
  style,
  safeArea = false,
  ...otherProps
}: ThemedViewProps) {
  const insets = useSafeAreaInsets();

  let safeAreaStyle = {};
  if (safeArea === true) {
    safeAreaStyle = { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right };
  } else if (safeArea === 'top') {
    safeAreaStyle = { paddingTop: insets.top };
  } else if (safeArea === 'bottom') {
    safeAreaStyle = { paddingBottom: insets.bottom };
  } else if (safeArea === 'horizontal') {
    safeAreaStyle = { paddingLeft: insets.left, paddingRight: insets.right };
  }

  return (
    <View
      style={[{ backgroundColor: Surface.lowest, flex: 1 }, safeAreaStyle, style]}
      {...otherProps}
    />
  );
}
