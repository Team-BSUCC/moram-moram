import { useQuery } from '@tanstack/react-query';
import { getMandalartWithRPC } from '../services/fetch-get-mandalarts-data';
import { MandalartAllJson } from '../types/realtime-type';

export const useRpcMandalartDataQuery = (id: string) => {
  return useQuery<MandalartAllJson>({
    queryKey: ['mandalarts-flat', id],
    queryFn: () => getMandalartWithRPC(id) as Promise<MandalartAllJson>,
    staleTime: Infinity,
    gcTime: 0,
  });
};
