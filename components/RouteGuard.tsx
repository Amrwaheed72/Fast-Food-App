import { useAuth } from '@/store/useAuthStore';
import { Image } from 'expo-image';
import { router, useSegments } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoLight from '@/assets/images/logo-light.png';
import logoDark from '@/assets/images/logo-dark.png';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { Text } from './ui/text';

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { colorScheme } = useColorScheme();
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

  // if (isLoading)
  //   return (
  //     <SafeAreaView
  //       className={`flex-1 items-center justify-center ${colorScheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
  //       <View className="flex-1 items-center justify-center">
  //         <Image source={colorScheme === 'dark' ? logoDark : logoLight} className="size-72"></Image>
  //         <Text className="font-quicksand-bold text-4xl tracking-widest ">Fast Food</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  return <>{children}</>;
};

export default RouteGuard;
