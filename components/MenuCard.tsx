import { MenusProps } from '@/types';
import { Image } from 'expo-image';
import { TouchableOpacity, Platform } from 'react-native';
import { Text } from './ui/text';
import { useCartStore } from '@/store/useCartStore';
const MenuCard = ({ item }: { item: MenusProps }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { image_url, name, price } = item;

  const encodedUrl = encodeURIComponent(image_url);
  const realBlurryUrl = `https://wsrv.nl/?url=${encodedUrl}&w=50&q=10&blur=5`;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="menu-card mx-1"
      style={Platform.OS === 'android' ? { elevation: 10 } : {}}>
      <Image
        source={{ uri: image_url }}
        placeholder={{ uri: realBlurryUrl }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={1000}
        className="size-32"
        allowDownscaling
      />
      <Text className="mb-2 text-center font-quicksand-bold text-sm">{name}</Text>
      <Text className="mb-4 font-quicksand-bold text-sm text-gray-500">From ${price}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => addItem({ id: item.$id, image_url, name, price })}>
        <Text className="paragraph-bold text-primary">Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
