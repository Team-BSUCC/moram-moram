import { useEffect, useRef } from 'react';
import {
  BroadcastPayloadType,
  SubtopicPayloadType,
  TodoPayloadType,
  TopicPayloadType,
} from '../types/realtime-type';
import { mandalartBatchUpdateSupabase } from '../services/mandalart-batch-update-supabase-service';
import { useQueryClient } from '@tanstack/react-query';

export type BroadcastStoreType = {
  topic: Map<string, TopicPayloadType>;
  subTopic: Map<string, SubtopicPayloadType>;
  todo: Map<string, TodoPayloadType>;
};

type FormatBroadcastStorePayloadType = {
  topic: {
    [k: string]: TopicPayloadType;
  };
  subTopic: {
    [k: string]: SubtopicPayloadType;
  };
  todo: {
    [k: string]: TodoPayloadType;
  };
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

  //브로드캐스트로 주고받던 변경된 데이터들을 수파베이스에 업로드
  const batchUpdateSupabase = async () => {
    try {
      await mandalartBatchUpdateSupabase(broadcastStore);
      //위에서 실행한 수파베이스 요청 로직이 성공하면 broadcastStore초기화
      broadcastStore.current.topic.clear();
      broadcastStore.current.subTopic.clear();
      broadcastStore.current.todo.clear();
    } catch (e) {
      console.log(e);
    }
  };

  //페이로드로 보낼 브로드캐스트를 리턴
  const formatBroadcastStorePayload = () => {
    return {
      topic: Object.fromEntries(broadcastStore.current.topic),
      subTopic: Object.fromEntries(broadcastStore.current.subTopic),
      todo: Object.fromEntries(broadcastStore.current.todo),
    };
  };

  //페이로드로 받은 브로드캐스트로 현재 브로드캐스트 업데이트
  const queryClient = useQueryClient();
  const receiveBroadcastStore = (
    payloadBroadcastStore: FormatBroadcastStorePayloadType
  ) => {
    broadcastStore.current = {
      topic: new Map(Object.entries(payloadBroadcastStore.topic || {})),
      subTopic: new Map(Object.entries(payloadBroadcastStore.subTopic || {})),
      todo: new Map(Object.entries(payloadBroadcastStore.todo || {})),
    };

    //topic 관련 텐스텍 state 변경
    if (broadcastStore.current.topic.size !== 0) {
      broadcastStore.current.topic.forEach((topicPayload, topicId) => {
        queryClient.setQueryData(['topic', topicId], topicPayload.value);
      });
    }

    //subtopic 관련 텐스텍 state 변경
    if (broadcastStore.current.subTopic.size !== 0) {
      broadcastStore.current.topic.forEach((subtopicPayload, subtopicId) => {
        queryClient.setQueryData(
          ['subtopic', subtopicId],
          subtopicPayload.value
        );
      });
    }

    //todo 관련 텐스텍 state 변경
    if (broadcastStore.current.todo.size !== 0) {
      broadcastStore.current.todo.forEach((todoPayload, todoId) => {
        if (todoPayload.action !== 'DELETE') {
          //소주제를 구분할 수 있는 쿼리키가 추가되어야 할 듯
          queryClient.setQueryData(['todo', todoId], todoPayload.value);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      batchUpdateSupabase();
    };
  }, []);

  return {
    addBroadcastStore,
    batchUpdateSupabase,
    formatBroadcastStorePayload,
    receiveBroadcastStore,
  };
};
