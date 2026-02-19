import { View } from 'react-native';
import { Text } from './ui/text';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const CustomHeader = ({
  children,
  title,
  subTitle,
  classNames,
}: {
  children: ReactNode;
  title: string;
  subTitle: string;
  classNames?: string;
}) => {
  return (
    <View className={cn('flex-between w-full flex-row', classNames)}>
      <View className="flex-start">
        <Text className="small-bold w-full uppercase text-primary">{title}</Text>
        <View className="flex-start mt-0.5 flex-row gap-x-1">
          <Text className="paragraph-semibold text-black dark:text-gray-100">{subTitle}</Text>
        </View>
      </View>
      {children}
    </View>
  );
};

export default CustomHeader;
