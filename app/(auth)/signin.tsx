import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View } from 'react-native';

const Signin = () => {
  return (
    <View>
      <Text>Signin</Text>
      <Button variant={'destructive'} onPress={() => router.navigate('/')}>
        <Text>Home page</Text>
      </Button>
    </View>
  );
};

export default Signin;
