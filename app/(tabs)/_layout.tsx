import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Tabs } from 'expo-router';
import { Home, LucideIcon, Search, ShoppingCart, User } from 'lucide-react-native';
import { View } from 'react-native';

const TabIcon = ({
  size,
  focused,
  icon,
  title,
}: {
  size: number;
  focused: boolean;
  icon: LucideIcon;
  title: string;
}) => (
  <View className={`mt-12 min-h-full min-w-20 items-center justify-center gap-1`}>
    <Icon as={icon} size={size} color={focused ? '#fe8000' : '#5d5f6d'} />
    <Text className={`text-center text-xs ${focused ? 'text-orange-500' : 'text-gray-500'}`}>
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginBottom: 40,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: 'absolute',
          bottom: 10,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <TabIcon size={size} focused={focused} icon={Home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <TabIcon size={size} focused={focused} icon={Search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <TabIcon size={size} focused={focused} icon={ShoppingCart} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <TabIcon size={size} focused={focused} icon={User} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
