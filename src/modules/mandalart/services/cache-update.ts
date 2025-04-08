import { QueryClient, QueryKey } from '@tanstack/react-query';

type CacheUpdaterParams<TData> = {
  queryClient: QueryClient;
  queryKey: QueryKey;
  newData: TData;
};

export const updateQueryCache = <TData>({
  queryClient,
  queryKey,
  newData,
}: CacheUpdaterParams<TData>): void => {
  queryClient.setQueryData<TData>(queryKey, newData);
};
