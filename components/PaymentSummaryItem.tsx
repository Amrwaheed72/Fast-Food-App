import { View } from 'react-native';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}
const PaymentSummaryItem = ({ label, value, labelStyle, valueStyle }: Props) => {
  return (
    <View className="flex-between my-1 flex-row">
      <Text className={cn('paragraph-medium text-gray-600 dark:text-gray-400', labelStyle)}>
        {label}
      </Text>
      <Text className={cn('paragraph-bold', valueStyle)}>{value}</Text>
    </View>
  );
};

export default PaymentSummaryItem;
