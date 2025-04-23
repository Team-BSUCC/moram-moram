import { useQuery } from '@tanstack/react-query';
import { getMandalartWithRPC } from '../services/fetch-get-mandalarts-data';
import {
  CellInfoType,
  MandalartAllJson,
  TodoType,
} from '../types/realtime-type';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { getQueryKey } from '../services/get-data-category';

/**
 * 만다라트 데이터를 불러오는 useQuery 커스텀 훅
 * @param id - 만다라트 id
 * @returns
 */

/**
 * 투두 데이터를 키에 저장하는 함수
 * @param value - 저장할 todo 값
 * @param id - todo id
 * @returns
 */
export const useTodoDataQuery = (value: TodoType, id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.todo(id),
    queryFn: () => Promise.resolve(value),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

/**
 * 캐시된 투두 데이터를 가져오는 useQuery 훅
 * @param id - 가져올 todo id 값
 * @returns
 */
export const useTodoCacheQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.todo(id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
};

/**
 * 투두 리스트(cell_todos 컬럼)를 useQuery에 저장하는 훅
 * @param id - 가져올 cell값
 * @returns
 */
export const useTodoListCacheQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.todolist(id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useCellCacheQuery = (info: CellInfoType) => {
  return useQuery({
    queryKey: getQueryKey(info),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
};

export const useTopicCacheQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.topic(id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
};

export const useSubtopicCacheQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY.subtopic(id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
};

export const useRpcMandalartDataQuery = (id: string) => {
  return useQuery<MandalartAllJson>({
    queryKey: ['mandalarts-flat', id],
    queryFn: () => getMandalartWithRPC(id) as Promise<MandalartAllJson>,
  });
};
