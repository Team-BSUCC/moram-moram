import { useRef } from 'react';
import {
  BroadcastPayloadType,
  SubtopicPayloadType,
  TodoPayloadType,
  TopicPayloadType,
} from '../types/realtime-type';

type BroadcastStoreType = {
  topic: Map<string, TopicPayloadType>;
  subTopic: Map<string, SubtopicPayloadType>;
  todo: Map<string, TodoPayloadType>;
};

export const useRealtimeBroadcastBatch = () => {
  const broadcastStore = useRef<BroadcastStoreType>({
    topic: new Map(),
    subTopic: new Map(),
    todo: new Map(),
  });

  //나중에 페이로드 객체 정의되면 페이로드 객체 인자로 받을 예정
  const addBroadcastStore = (payload: BroadcastPayloadType) => {
    //payload에 topic이 들어오면 실행
    if (payload.category === 'TOPIC') {
      broadcastStore.current.topic.set(payload.id, payload);
    }
    //payload에 subtopic이 들어오면
    if (payload.category === 'SUBTOPIC') {
      broadcastStore.current.subTopic.set(payload.id, payload);
    }
    //payload에 todo가 들어오면
    if (payload.category === 'TODO') {
      broadcastStore.current.todo.set(payload.id, payload);
    }
  };

  const batchUpdateSupabase = async () => {
    //수파베이스 업데이트 일괄 업데이트 로직
    broadcastStore.current.topic.clear();
    broadcastStore.current.subTopic.clear();
    broadcastStore.current.todo.clear();
  };

  return { addBroadcastStore, batchUpdateSupabase };
};
