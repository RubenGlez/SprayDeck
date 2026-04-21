import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'react-native-reanimated';
import i18n from 'i18next';

import { Surface } from '@/constants/theme';
import { useLanguageStore } from '@/stores/useLanguageStore';
import '@/i18n';

function CrashReporter() {
  const posthog = usePostHog();
  const prevHandler = useRef<((error: Error, isFatal?: boolean) => void) | null>(null);

  useEffect(() => {
    prevHandler.current = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
      posthog?.capture('$exception', {
        $exception_message: error.message,
        $exception_type: error.name,
        $exception_stack: error.stack ?? null,
        is_fatal: isFatal ?? false,
      });
      prevHandler.current?.(error, isFatal);
    });
    return () => {
      if (prevHandler.current) ErrorUtils.setGlobalHandler(prevHandler.current);
    };
  }, [posthog]);

  return null;
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const language = useLanguageStore((s) => s.language);

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  if (!fontsLoaded) return null;

  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? ''}
      options={{ host: 'https://us.i.posthog.com' }}
    >
    <CrashReporter />
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Surface.lowest }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={DarkTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="palettes" options={{ headerShown: false }} />
              <Stack.Screen name="doodles" options={{ headerShown: false }} />
              <Stack.Screen name="color-grid" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="light" />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </PostHogProvider>
  );
}
