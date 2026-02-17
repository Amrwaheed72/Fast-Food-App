import { Image, ImageBackground } from 'expo-image';
import { Slot } from 'expo-router';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import loginGraphic from '../../assets/images/login-graphic.png';
import logoLight from '../../assets/images/logo-light.png';
import logoDark from '../../assets/images/logo-dark.png';
import { useColorScheme } from 'nativewind';
const AuthLayout = () => {
  const { colorScheme } = useColorScheme();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View
          className="relative w-full"
          style={{ height: Dimensions.get('screen').height / 2.31 }}>
          <ImageBackground
            source={loginGraphic}
            className="size-full rounded-b-lg"
            transition={1000}
            cachePolicy="memory-disk"
            priority="high"
            contentFit="contain"
          />
          <Image
            source={colorScheme === 'dark' ? logoDark : logoLight}
            transition={1000}
            cachePolicy="memory-disk"
            priority="high"
            contentFit="contain"
            className="absolute -bottom-16 z-50 size-48 self-center"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
