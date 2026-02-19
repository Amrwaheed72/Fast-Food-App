import { View } from 'react-native';
import Error from '@/assets/images/error-state.webp';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react-native';
import { Icon } from './ui/icon';
import { Image } from 'expo-image';
const ErrorFallback = ({ error, refetch }: { error: string | undefined; refetch: () => void }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-96 w-96">
        <Image source={Error} contentFit="contain" className="h-full w-full" />
      </View>
      <View className="gap-5">
        <Text className="font-quicksand-bold tracking-widest" numberOfLines={1}>
          Error occurred while loading the data
        </Text>
        <Text
          className="text-center font-quicksand-semibold text-xs text-red-500"
          numberOfLines={1}>
          {error}
        </Text>
        <Button
          // variant={null}
          onPress={refetch}>
          <Text className="font-quicksand-bold text-white">Try again</Text>
          <Icon as={RefreshCcw} color={'white'} />
        </Button>
      </View>
    </View>
  );
};

export default ErrorFallback;
