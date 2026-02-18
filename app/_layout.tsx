import '@/global.css';
import { useFonts } from 'expo-font';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cssInterop, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Image, ImageBackground } from 'expo-image';
import RouteGuard from '@/components/RouteGuard';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://f79a5068d4dcfbcc04808cb203140af3@o4510030059995136.ingest.de.sentry.io/4510905623642192',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
export { ErrorBoundary } from 'expo-router';

cssInterop(Image, {
  className: 'style',
});
cssInterop(ImageBackground, {
  className: 'style',
});
export default Sentry.wrap(function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) return null;
  return (
    <RouteGuard>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }} />
        <PortalHost />
      </ThemeProvider>
    </RouteGuard>
  );
});