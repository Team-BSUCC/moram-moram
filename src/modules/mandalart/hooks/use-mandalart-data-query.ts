import { useQuery } from '@tanstack/react-query';
import { fetchGetMandalartsData } from '../services/fetch-get-Mandalarts-data';
import { CellInfo, MandalartType } from '../types/realtime-type';
import { QUERY_KEY } from '@/shared/constants/query-key';

export const useMandalartDataQuery = (id: string) => {
  return useQuery<MandalartType>({
    queryKey: ['mandalarts', id],
    queryFn: () => fetchGetMandalartsData(id) as Promise<MandalartType>,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

const processQueryKey = (info: CellInfo) => {
  if ('private' in info) {
    return QUERY_KEY.core(info.id);
  }
  if ('topic' in info) {
    return QUERY_KEY.topic(info.id);
  }
  if ('cell_index' in info) {
    return QUERY_KEY.subtopic(info.id);
  }
  return ['알 수 없는 타입'];
};

export const useCellDataQuery = (value: string, info: CellInfo) => {
  return useQuery({
    queryKey: processQueryKey(info),
    queryFn: () => Promise.resolve(value),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
