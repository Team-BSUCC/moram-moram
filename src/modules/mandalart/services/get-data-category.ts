import { QUERY_KEY } from '@/shared/constants/query-key';
import { ExtendedCellInfo, ShowInfoType } from '../types/realtime-type';

// 카테고리 지정을 위한 임시 지정 함수
export const getDataCategory = (info: ExtendedCellInfo): ShowInfoType => {
  if ('private' in info) {
    return { ...info, category: 'CORE' } as ShowInfoType;
  }
  if ('topic' in info) {
    return { ...info, category: 'TOPIC' } as ShowInfoType;
  }
  if ('cell_index' in info) {
    return { ...info, category: 'SUBTOPIC' } as ShowInfoType;
  }
  return info as ShowInfoType;
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
