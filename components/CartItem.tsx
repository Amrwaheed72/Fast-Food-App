import { cartItems } from '@/types';
import { Image } from 'expo-image';
import { Minus, Plus, Trash } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { useCartStore } from '@/store/useCartStore';
import { Icon } from './ui/icon';

const CartItem = ({ item }: { item: cartItems }) => {
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const { image_url, name, customizations, id, quantity, price } = item;

  return (
    <View className="relative mb-4 flex-row items-end justify-between rounded-xl p-3 shadow-md dark:shadow-orange-500/30">
      <View className="w-full flex-row items-center gap-x-3">
        <View className="size-24 items-center justify-center rounded-lg bg-primary/10">
          <Image
            source={{ uri: image_url }}
            contentFit="cover"
            className="size-4/5 rounded-lg"
            transition={1000}
            cachePolicy="memory-disk"
          />
        </View>
        <View>
          <Text className="base-bold">{name}</Text>
          <Text className="paragraph-bold mt-1 text-primary">${price}</Text>
          <View className="mt-2 flex flex-row items-center gap-x-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => decreaseQty(id, customizations!)}
              disabled={quantity === 1}
              className="flex flex-row items-center justify-center rounded-md bg-primary p-0.5">
              <Icon as={Minus} color="white" size={20} />
            </TouchableOpacity>
            <Text className="base-bold">{quantity}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => increaseQty(id, customizations!)}
              className="flex flex-row items-center justify-center rounded-md bg-primary p-0.5">
              <Icon as={Plus} size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        className="absolute bottom-4 end-4">
        <Icon as={Trash} className="size-5 text-red-500" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
