import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link, router } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Eye, EyeOff } from 'lucide-react-native';
import { Spinner } from '@/components/ui/spinner';
import * as Burnt from 'burnt';
import { useAuth } from '@/store/useAuthStore';
import * as Sentry from '@sentry/react-native';

const schema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').trim(),
  email: z.email('Please enter a valid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters').trim(),
});
type signinSchema = z.infer<typeof schema>;

const Signup = () => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const isLoading = useAuth((state) => state.isLoading);
  const signup = useAuth((state) => state.signup);
  const methods = useForm<signinSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const {
    formState: { errors },
    setError,
    handleSubmit,
  } = methods;
  const onSubmit = async (data: signinSchema) => {
    if (!data.username.trim() || !data.email.trim() || !data.password.trim()) return;
    try {
      await signup(data.username, data.email, data.password);
      Burnt.toast({
        title: 'Signed up successfully',
      });
      router.replace('/');
    } catch (error: any) {
      Sentry.captureEvent(error);
      if (error instanceof Error) {
        Burnt.alert({
          title: error.message,
        });
        setError('root', {
          message: error.message,
        });
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <View className="mt-5 gap-5 p-5">
        {errors.root && <Text className="text-red-500">{errors.root.message}</Text>}
        <FormInput
          placeholder="Enter Your username"
          name="username"
          keyboardType="default"
          textContentType="username"
          label="Username"
        />
        <FormInput
          placeholder="Enter Your Email"
          name="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          label="Email Address"
        />
        <FormInput
          placeholder="Enter Your Password"
          name="password"
          label="Password"
          textContentType="password"
          keyboardType="default"
          isPassword={isPassword}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              setIsPassword((prev) => !prev);
            }}
            activeOpacity={0.8}
            className="absolute end-2 top-[45%] p-2">
            {isPassword ? <Icon as={Eye} size={20} /> : <Icon as={EyeOff} size={20} />}
          </TouchableOpacity>
        </FormInput>
        <Button onPress={handleSubmit(onSubmit)} disabled={isLoading} className="gap-2">
          <Text className="text-white"> Sign up</Text>
          <View>
            {isLoading && <Spinner variant="ring" size="sm" className="dark:border-white" />}
          </View>
        </Button>
        <View className="flex-row items-center gap-2">
          <Text className="base-regular text-gray-600 dark:text-gray-300">
            Already have an account?
          </Text>
          <Link href="/signup" className="base-bold text-primary">
            Sign in
          </Link>
        </View>
      </View>
    </FormProvider>
  );
};

export default Signup;
