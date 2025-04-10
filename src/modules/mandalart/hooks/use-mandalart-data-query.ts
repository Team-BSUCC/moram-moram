import { useQuery } from '@tanstack/react-query';
import { fetchGetMandalartsData } from '../services/fetch-get-mandalarts-data';
import { ExtendedCellInfo, MandalartType } from '../types/realtime-type';
import { QUERY_KEY } from '@/shared/constants/query-key';

/**
 * 만다라트 데이터를 불러오는 useQuery 커스텀 훅
 * @param id - 만다라트 id
 * @returns
 */
export const useMandalartDataQuery = (id: string) => {
  return useQuery<MandalartType>({
    queryKey: ['mandalarts', id],
    queryFn: () => fetchGetMandalartsData(id) as Promise<MandalartType>,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// 카테고리 지정을 위한 임시 지정 함수
export const processQueryKey = (info: ExtendedCellInfo) => {
  if ('private' in info) {
    return QUERY_KEY.core(info.id);
  }
  if ('topic' in info) {
    return QUERY_KEY.topic(info.id);
  }
  if ('cell_index' in info) {
    return QUERY_KEY.subtopic(info.id);
  }
  if ('cell_id' in info) {
    return QUERY_KEY.todo(info.id);
  }
  return ['알 수 없는 타입'];
};

/**
 * 투두 데이터를 키에 저장하는 함수
 * @param value - 저장할 todo 값
 * @param id - todo id
 * @returns
 */
export const useTodoDataQuery = (value: string, id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.todo(id),
    queryFn: () => Promise.resolve(value),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
