import { useEffect, useRef } from 'react';
import {
  BroadcastPayloadType,
  BroadcastStoreType,
  SubtopicPayloadType,
  TodoPayloadType,
  TopicPayloadType,
} from '../types/realtime-type';
import { mandalartBatchUpdateSupabase } from '../services/mandalart-batch-update-supabase-service';
import { useQueryClient } from '@tanstack/react-query';

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

/**
 * 배치업데이트를 위한 저장소(broadcastStore)를 조작하는 커스텀 훅
 * @returns {object} 브로드캐스트 스토어 관련 함수들 객체
 *   - addBroadcastStore: 브로드캐스트 스토어에 데이터(payload) 추가 함수
 *   - batchUpdateSupabase: Supabase에 일괄 업데이트를 수행하는 함수
 *   - formatBroadcastStorePayload: 브로드캐스트 스토어 페이로드 형식화 함수
 *   - receiveBroadcastStore: 브로드캐스트 스토어 데이터 수신 함수
 */
export const useRealtimeBroadcastBatch = () => {
  const queryClient = useQueryClient();
  const broadcastStore = useRef<BroadcastStoreType>({
    topic: new Map(),
    subTopic: new Map(),
    todo: new Map(),
  });

  /**
   * 브로드캐스트 스토어에 업데이트할 항목을 추가하는 함수
   * @param payload - 저장할 항목 데이터
   */
  const addBroadcastStore = (payload: BroadcastPayloadType) => {
    if (payload.category === 'TOPIC') {
      broadcastStore.current.topic.set(payload.id, payload);
    } else if (payload.category === 'SUBTOPIC') {
      broadcastStore.current.subTopic.set(payload.id, payload);
    } else if (payload.category === 'TODO') {
      broadcastStore.current.todo.set(payload.id, payload);
    }
  };

  /**
   * 브로드캐스트 스토어에 저장된 업데이트 내용을 Supabase에 일괄 적용하는 함수
   * 성공 시 브로드캐스트 스토어를 초기화함
   * 컴포넌트 언마운트시 자동으로 한번 실행
   */
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

  /**
   * 브로드캐스트 스토어의 현재 상태를 직렬화 가능한 형태로 변환하는 함수
   * 브로드캐스트 스토어를 전송하기 위한 목적
   * @returns 직렬화된 브로드캐스트 스토어 데이터
   */
  const formatBroadcastStorePayload = () => {
    return {
      topic: Object.fromEntries(broadcastStore.current.topic),
      subTopic: Object.fromEntries(broadcastStore.current.subTopic),
      todo: Object.fromEntries(broadcastStore.current.todo),
    };
  };

  /**
   * @todo : 나중에 투두 찍어내는 로직 확실해지면 추가 작업예정, 소주제를 구분할 수 있는 쿼리키가 추가되어야 할 듯
   * 브로드캐스트 스토어 페이로드를 수신하여 로컬 만다라트상태를 업데이트하는 함수
   * @param payloadBroadcastStore - 수신된 브로드캐스트 스토어 페이로드
   */
  const receiveBroadcastStore = (
    payloadBroadcastStore: FormatBroadcastStorePayloadType
  ) => {
    broadcastStore.current = {
      topic: new Map(Object.entries(payloadBroadcastStore.topic || {})),
      subTopic: new Map(Object.entries(payloadBroadcastStore.subTopic || {})),
      todo: new Map(Object.entries(payloadBroadcastStore.todo || {})),
    };

    if (broadcastStore.current.topic.size !== 0) {
      broadcastStore.current.topic.forEach((topicPayload, topicId) => {
        queryClient.setQueryData(['topic', topicId], topicPayload.value);
      });
    }

    if (broadcastStore.current.subTopic.size !== 0) {
      broadcastStore.current.topic.forEach((subtopicPayload, subtopicId) => {
        queryClient.setQueryData(
          ['subtopic', subtopicId],
          subtopicPayload.value
        );
      });
    }

    if (broadcastStore.current.todo.size !== 0) {
      broadcastStore.current.todo.forEach((todoPayload, todoId) => {
        if (todoPayload.action !== 'DELETE') {
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
