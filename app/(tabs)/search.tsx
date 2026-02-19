import CartButton from '@/components/CartButton';
import CustomHeader from '@/components/CustomHeader';
import Empty from '@/components/Empty';
import ErrorFallback from '@/components/ErrorFallback';
import Filters from '@/components/Filters';
import MenuCard from '@/components/MenuCard';
import SearchInput from '@/components/SearchInput';
import { Spinner } from '@/components/ui/spinner';
import useGetCategories from '@/hooks/useGetCategories';
import useGetMenus from '@/hooks/useGetMenus';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const headerComponent = () => (
  <View className="my-5 gap-5">
    <CustomHeader title="Search" subTitle="Find Your Favorite Food">
      <CartButton />
    </CustomHeader>
    <SearchInput />

    <Filters />
  </View>
);
const Search = () => {
  const params = useLocalSearchParams<{ filter: string; query: string }>();
  const { data, isPending, error, refetch } = useGetMenus(params.filter, params.query);
  const { isPending: isLoadingCat, error: errorCat, refetch: refetchCat } = useGetCategories();
  if (error) return <ErrorFallback error={error?.message} refetch={refetch} />;
  if (errorCat) return <ErrorFallback error={errorCat.message} refetch={refetchCat} />;
  if (isLoadingCat)
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner variant="ring" size="xl" />
      </View>
    );
  return (
    <SafeAreaView className="flex-1 p-2">
      <FlashList
        data={data || []}
        ListEmptyComponent={
          isPending ? (
            <View className="flex-1 items-center justify-center">
              <Spinner variant="ring" size="xl" />
            </View>
          ) : (
            <Empty />
          )
        }
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName=" px-5 pb-32 "
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={headerComponent}
        renderItem={({ item, index }) => {
          const isFirst = index % 2 === 0;
          return (
            <View className={`flex-1 py-2 ${isFirst ? 'mt-14' : 'mt-0'}`}>
              <MenuCard item={item} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
