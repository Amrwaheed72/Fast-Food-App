import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Platform, TouchableOpacity } from 'react-native';
import { Text } from './ui/text';
import useGetCategories from '@/hooks/useGetCategories';
import { CategoriesProps } from '@/types';

const Filters = () => {
  const params = useLocalSearchParams<{ filter: string | '' }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || 'all');
  const { data } = useGetCategories();

  const handleFilter = (value: string) => {
    if (!value) return;
    if (value === 'all') {
      router.setParams({ filter: '' });
      setSelectedCategory('all');
      return;
    }
    if (value === selectedCategory) {
      setSelectedCategory('');
      router.setParams({ filter: '' });
      return;
    }
    setSelectedCategory(value);
    router.setParams({ filter: value });
  };
  const filteredData: (CategoriesProps | { $id: string; name: string })[] = data
    ? [{ $id: 'all', name: 'All' }, ...data]
    : [{ $id: 'all', name: 'All' }];
  return (
    <>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.$id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-2 pb-3"
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => handleFilter(item.$id)}
            activeOpacity={0.8}
            // style={Platform.OS === 'android' ? { elevation: 5 } : {}}
            className={`rounded-full px-4 py-2 ${
              selectedCategory === item.$id
                ? 'bg-primary'
                : 'border border-orange-400/40 dark:border-orange-900/40'
            }`}>
            <Text className={`${selectedCategory === item.$id ? 'text-white' : 'text-gray-400'}`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* <ScrollView horizontal className="w-full gap-2" showsHorizontalScrollIndicator={false}>
      {data?.map((filter) => {
        return (
          
        );
      })}
    </ScrollView> */}
    </>
  );
};

export default Filters;
