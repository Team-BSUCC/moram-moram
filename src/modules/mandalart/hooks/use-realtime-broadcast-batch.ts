import { Tables } from '@/shared/types/database.types';
import { useRef } from 'react';

type BroadcastStoreType = {
  topic: Map<string, Tables<'mandalart_topics'>>;
  subTopic: Map<string, Tables<'mandalart_subtopics'>>;
  todo: Map<
    string,
    Tables<'cell_todos'> & {
      action: string;
    }
  >;
};

type PayloadType =
  | (Tables<'mandalart_topics'> & { category: 'TOPIC' })
  | (Tables<'mandalart_subtopics'> & { category: 'SUBTOPIC' })
  | (Tables<'cell_todos'> & {
      action: string;
      category: 'TODO';
    });

export const useRealtimeBroadcastBatch = () => {
  const broadcastStore = useRef<BroadcastStoreType>({
    topic: new Map(),
    subTopic: new Map(),
    todo: new Map(),
  });

  //나중에 페이로드 객체 정의되면 페이로드 객체 인자로 받을 예정
  const addBroadcastStore = (payload: PayloadType) => {
    //payload에 topic이 들어오면 실행
    if ('topic_index' in payload) {
      broadcastStore.current.topic.set(key, value);
    }
    //payload에 subtopic이 들어오면
    if ('cell_index' in payload) {
      broadcastStore.current.subTopic.set(key, value);
    }
    //payload에 todo가 들어오면
    if ('action' in payload) {
      broadcastStore.current.todo.set(key, value);
    }
  };

  const batchUpdateSupabase = async () => {
    broadcastStore.current.topic.clear();
    broadcastStore.current.subTopic.clear();
    broadcastStore.current.todo.clear();
  };

  return { addBroadcastStore, batchUpdateSupabase };
};
