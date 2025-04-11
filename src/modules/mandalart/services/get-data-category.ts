import { QUERY_KEY } from '@/shared/constants/query-key';
import {
  BroadcastPayloadType,
  CellInfoType,
  ShowInfoType,
} from '../types/realtime-type';

// 카테고리 지정을 위한 지정 함수
export const getDataCategory = (info: CellInfoType): ShowInfoType => {
  if ('private' in info) {
    return { ...info, category: 'CORE' };
  }
  if ('topic' in info) {
    return { ...info, category: 'TOPIC' } as ShowInfoType;
  }
  if ('cell_index' in info) {
    return { ...info, category: 'SUBTOPIC' };
  }
  throw new Error('Invalid CellInfo');
};

// 쿼리키 카테고리를 위한 지정 함수
export const getQueryKey = (info: CellInfoType | BroadcastPayloadType) => {
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
  throw new Error('Invalid CellInfo');
};
