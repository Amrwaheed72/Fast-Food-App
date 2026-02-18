import { useAuth } from '@/store/useAuthStore';
import { Image } from 'expo-image';
import { router, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import splash from '@/assets/images/splash-icon.png';

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);
  const getUser = useAuth((state) => state.getUser);

  const segment = useSegments();
  const isInAuthPage = segment[0] === '(auth)';
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (isLoading) return;
    if (!user && !isInAuthPage) {
      router.replace('/signin');
    }
    if (user && isInAuthPage) {
      router.replace('/');
    }
  }, [user, isLoading, router, segment]);

  return <>{children}</>;
};

export default RouteGuard;
