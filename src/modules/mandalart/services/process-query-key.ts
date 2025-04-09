import { BroadcastPayloadType } from '../types/realtime-type';

export const processQueryKey = (
  props: Partial<BroadcastPayloadType>
): (string | undefined)[] => {
  // mandalarts 테이블인지 확인 (고유 속성 private으로 판단)
  if ('private' in props) {
    return ['core', props.id];
  }
  // mandalart_topics 테이블인지 확인 (고유 속성 topic으로 판단)
  else if ('topic' in props) {
    return ['topic', props.id];
  }
  // mandalart_subtopics 테이블인지 확인 (고유 속성 cell_index로 판단)
  else if ('cell_index' in props) {
    return ['subtopic', props.id];
  }
  // cell_todos 테이블인지 확인 (고유 속성 cell_id로 판단)
  else if ('cell_id' in props) {
    return ['todos', props.id];
  }
  return ['알 수 없는 데이터 타입'];
};
