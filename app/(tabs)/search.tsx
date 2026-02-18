import { Text } from '@/components/ui/text';
import useGetCategories from '@/hooks/useGetCategories';
import useGetMenus from '@/hooks/useGetMenus';
import { useAuth } from '@/store/useAuthStore';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const params = useLocalSearchParams<{ filter: string; query: string }>();
  const { data, isPending, error, refetch } = useGetMenus(params.filter, params.query);
  const {
    data: categories,
    isPending: isLoadingCat,
    error: errorCat,
    refetch: refetchCat,
  } = useGetCategories();
  console.log(categories);
  return (
    <SafeAreaView>
      <Text>A7a</Text>
    </SafeAreaView>
  );
};

export default Search;
