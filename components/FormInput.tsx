import { TextInput, TextInputProps, View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Text } from './ui/text';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props extends TextInputProps {
  name: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  label?: string;
  isText?: boolean;
  children?: ReactNode;
}

const FormInput = ({
  name,
  placeholder,
  keyboardType = 'default',
  textContentType,
  label,
  isText,
  children,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <View className="relative">
      <Text className="font-quicksand-bold mb-1 text-gray-600 dark:text-gray-300">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={cn(
              'input dark:text-gray-200 dark:placeholder:text-gray-500',
              isFocused ? 'border-primary' : 'border-gray-300'
            )}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            autoCapitalize="none"
            keyboardType={keyboardType}
            textContentType={textContentType}
            secureTextEntry={isText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      />
      {children}
      {errorMessage && <Text className="ml-2 mt-1 text-sm text-red-500">{errorMessage}</Text>}
    </View>
  );
};

export default FormInput;
