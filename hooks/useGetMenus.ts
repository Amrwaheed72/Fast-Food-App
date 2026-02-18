import { getMenu } from '@/api';
import { useQuery } from '@tanstack/react-query';
const useGetMenus = (filter: string, search: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['menu', filter, search],
    queryFn: () => getMenu(filter, search),
  });
  return { data, isPending, error, refetch };
};

export default useGetMenus;
