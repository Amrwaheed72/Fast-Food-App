import { TouchableOpacity, View } from 'react-native';
import { Text } from './ui/text';
import { Image } from 'expo-image';
import { Icon } from './ui/icon';
import { ShoppingCart } from 'lucide-react-native';
const cartItems = 9;
const CartButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} className="cart-btn" onPress={() => {}}>
      <Icon as={ShoppingCart} size={18} className='text-white' />
      {cartItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold to-white text-xs">{cartItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
