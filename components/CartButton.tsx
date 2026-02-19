import { TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { Icon } from './ui/icon';
import { ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/useCartStore';
import { router } from 'expo-router';
const CartButton = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  return (
    <TouchableOpacity activeOpacity={0.8} className="cart-btn" onPress={() => {router.push('/cart')}}>
      <Icon as={ShoppingCart} size={18} className="text-white" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold to-white text-xs">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
