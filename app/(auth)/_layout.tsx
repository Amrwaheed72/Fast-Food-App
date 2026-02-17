import { Text } from '@/components/ui/text';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthLayout = () => {
  return (
    <SafeAreaView>
      <Text>asfasfasf</Text>
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
