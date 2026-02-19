import { TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from './ui/icon';
import { Search, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useDebounce } from '@/hooks/useDebounce';
const delayedTime = 1000;
const SearchInput = () => {
  const params = useLocalSearchParams<{ query: string | '' }>();
  const [query, setQuery] = useState(params.query || '');
  const debounced = useDebounce(query, delayedTime);
  useEffect(() => {
    router.setParams({ query: debounced });
  }, [debounced]);

  return (
    <View className="w-full rounded-md border border-orange-400/40 p-2">
      <View className="w-full flex-row items-center justify-center">
        <Icon as={Search} size={24} className="text-orange-500" />
        <TextInput
          className="ml-2 flex-1 text-sm dark:text-white dark:placeholder:text-gray-400"
          placeholder="Search for anything..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          className="p-2"
          onPress={(e) => {
            e.stopPropagation();
            setQuery('');
          }}>
          <Icon as={X} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
