import { getCategories } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useGetCategories = () => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: () => getCategories(),
  });
  return { data, isPending, error, refetch };
};

export default useGetCategories;
