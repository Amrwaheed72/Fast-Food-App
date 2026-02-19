import { Image, View } from 'react-native';
import empty from '@/assets/images/empty-state.webp';
import { Text } from './ui/text';
const Empty = ({ message = 'No Results Found' }: { message?: string }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-80 w-80">
        <Image source={empty} resizeMode="contain" className="h-full w-full" />
        <Text className="text-center font-quicksand-bold text-lg tracking-widest text-primary">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Empty;
