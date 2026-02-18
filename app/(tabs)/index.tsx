import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Button, TouchableOpacity, View } from 'react-native';
import { offers } from '@/lib/constants';
import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { ArrowRight, ChevronDown } from 'lucide-react-native';
import CartButton from '@/components/CartButton';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/store/useAuthStore';
import * as Burnt from 'burnt';

const header = () => (
  <View className="flex-between my-5 w-full flex-row">
    <View className="flex-start">
      <Text className="small-bold text-primary">Deliver To</Text>
      <TouchableOpacity activeOpacity={0.8} className="flex-center mt-0.5 flex-row gap-x-1">
        <Text className="paragraph-bold text-dark-100 dark:text-gray-50">Sharqia, Egypt</Text>
        <Icon as={ChevronDown} size={15} />
      </TouchableOpacity>
    </View>
    <CartButton />
    <ThemeToggle />
  </View>
);
export default function Screen() {
  const signout = useAuth((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signout();
      Burnt.toast({
        title: 'Signed out successfully',
      });
    } catch (error) {
      Burnt.alert({
        title: 'errorrrrrrr',
      });
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={offers}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={header}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.9}
                className={cn('offer-card', isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}>
                <>
                  <View className="h-full w-1/2">
                    {/* <Button title="a7a"  onPress={handleLogout}/> */}
                    <Image
                      source={item.image}
                      className="size-full"
                      transition={1000}
                      cachePolicy="memory-disk"
                      priority="high"
                      contentFit="contain"
                    />
                  </View>
                  <View className={cn('offer-card__info', isEven ? 'pl-10' : 'pr-10')}>
                    <Text className="h1-bold text-2xl leading-tight text-white">{item.title}</Text>
                    <View className="rounded-full border border-white px-2">
                      <Icon as={ArrowRight} size={20} color={'#ffffff'} />
                    </View>
                  </View>
                </>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
