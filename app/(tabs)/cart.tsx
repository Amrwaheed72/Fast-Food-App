import CartItem from '@/components/CartItem';
import CustomHeader from '@/components/CustomHeader';
import Empty from '@/components/Empty';
import PaymentSummaryItem from '@/components/PaymentSummaryItem';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCartStore } from '@/store/useCartStore';
import { cartItems } from '@/types';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const header = () => (
  <CustomHeader title="Your Cart" subTitle="Home">
    <View className="px-4 py-2 bg-primary/10 rounded-md">
      <Text>Change Location</Text>
    </View>
  </CustomHeader>
);
const Cart = () => {
  const {
    items,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const totalItems: number = getTotalItems();
  const totalPrice: number = getTotalPrice();
  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5 "
        ListHeaderComponent={header}
        ListEmptyComponent={<Empty />}
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 rounded-2xl border border-gray-200 p-2 dark:border-gray-800">
                <Text className="h3-bold mb-5">Payment Summary</Text>
                <PaymentSummaryItem
                  label={`Total Items ${totalItems}`}
                  value={`${totalPrice.toFixed(2)}`}
                />
                <PaymentSummaryItem label={`Delivery Fee `} value={`$5.00`} />
                <PaymentSummaryItem
                  label={`Discount`}
                  value={`- $0.50`}
                  valueStyle="!text-success"
                />
                <View className="my-2 border-t border-gray-300"></View>
                <PaymentSummaryItem
                  label={`Total`}
                  value={`${(totalPrice + 5 - 0.5).toFixed(2)}`}
                  valueStyle="base-bold !text-right"
                  labelStyle="base-bold "
                />
              </View>
              <Button>
                <Text className="text-white">Order Now!</Text>
              </Button>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
