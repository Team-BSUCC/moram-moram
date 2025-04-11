import { QUERY_KEY } from '@/shared/constants/query-key';
import { BroadcastPayloadType } from '../types/realtime-type';

/**
 * 들어온 객체가 어떤 테이블에 속한 row값인지 판단하는 함수
 * @param props 테이블 row값 그대로 보내면 됩니다.
 * @returns 그러면 배열의 형태로 값을 줄거에요
 * 'private'라는 값이 포함되어 있으면 그건 mandalarts 테이블의 row값,
 * 'topic'이라는 값이 포함되어 있으면 그건 mandalarts_topics 테이블의 row값,
 * 'cell_index'라는 값이 포함되어 있으면 그건 mandalarts_subtopics 테이블의 row값,
 * 'cell_id'라는 값이 포함되어 있으면 그건 cell_todos 테이블의 row값입니다.
 * 그리고 아무 것도 해당되지 않으면 알 수가 없어요
 *
 * TODO : 지은님이 만들어주신 상수 QueryKey로 리팩토링하기
 */
export const processQueryKey = (
  props: Omit<BroadcastPayloadType, 'category'>
): (string | undefined)[] => {
  if ('private' in props) {
    return QUERY_KEY.core(props.id);
  } else if ('topic' in props) {
    return QUERY_KEY.topic(props.id);
  } else if ('cell_index' in props) {
    return QUERY_KEY.subtopic(props.id);
  } else if ('cell_id' in props) {
    return QUERY_KEY.todo(props.id);
  }
  throw new Error('Unknown props type');
};
