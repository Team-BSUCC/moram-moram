import { QUERY_KEY } from '@/shared/constants/query-key';
import { ExtendedCellInfo } from '../types/realtime-type';

export const getDataCategory = (info: ExtendedCellInfo) => {
  if ('private' in info) {
    return { ...info, category: 'CORE' };
  }
  if ('topic' in info) {
    return { ...info, category: 'TOPIC' };
  }
  if ('cell_index' in info) {
    return { ...info, category: 'SUBTOPIC' };
  }
  if ('cell_id' in info) {
    return { ...info, category: 'TODO' };
  }
  return info;
};

// 카테고리 지정을 위한 임시 지정 함수
export const getQueryKey = (info: ExtendedCellInfo) => {
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
