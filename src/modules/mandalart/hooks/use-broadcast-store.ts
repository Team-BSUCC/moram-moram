import { create } from 'zustand';
import {
  BroadcastPayloadType,
  BroadcastStoreType,
  FormatBroadcastStorePayloadType,
  SubtopicPayloadType,
  TodoPayloadType,
  TopicPayloadType,
} from '../types/realtime-type';
import { mandalartBatchUpdateSupabase } from '../services/mandalart-batch-update-supabase-service';

// 브로드캐스트 스토어 상태 타입
type BroadcastStoreStateType = {
  broadcastStore: BroadcastStoreType;
  addBroadcastStore: (payload: BroadcastPayloadType) => void;
  batchUpdateSupabase: () => Promise<void>;
  formatBroadcastStorePayload: () => FormatBroadcastStorePayloadType;
};

export const useBroadcastStore = create<BroadcastStoreStateType>((_, get) => ({
  broadcastStore: {
    topic: new Map<string, TopicPayloadType>(),
    subTopic: new Map<string, SubtopicPayloadType>(),
    todo: new Map<string, TodoPayloadType>(),
  },

  /**
   * 브로드캐스트 스토어에 업데이트할 항목을 추가하는 함수
   * @param payload - 저장할 항목 데이터
   */
  addBroadcastStore: (payload: BroadcastPayloadType) => {
    const currentStore = get().broadcastStore;
    if (payload.category === 'TOPIC') {
      currentStore.topic.set(payload.id, payload);
    } else if (payload.category === 'SUBTOPIC') {
      currentStore.subTopic.set(payload.id, payload);
    } else if (payload.category === 'TODO') {
      currentStore.todo.set(payload.id, payload);
    }
  },

  /**
   * 브로드캐스트 스토어에 저장된 업데이트 내용을 Supabase에 일괄 적용하는 함수
   * 성공 시 브로드캐스트 스토어를 초기화함
   */
  batchUpdateSupabase: async () => {
    try {
      const currentStore = get().broadcastStore;
      if (
        currentStore.topic.size === 0 &&
        currentStore.subTopic.size === 0 &&
        currentStore.todo.size === 0
      ) {
        return;
      }
      await mandalartBatchUpdateSupabase({ current: currentStore });
      // 업데이트 후 스토어 초기화
      currentStore.topic.clear();
      currentStore.subTopic.clear();
      currentStore.todo.clear();
    } catch (e) {
      console.error('배치 업데이트 중 오류 발생:', e);
    }
  },

  /**
   * 브로드캐스트 스토어의 현재 상태를 직렬화 가능한 형태로 변환하는 함수
   * 브로드캐스트 스토어를 전송하기 위한 목적
   * @returns 직렬화된 브로드캐스트 스토어 데이터
   */
  formatBroadcastStorePayload: () => {
    const currentStore = get().broadcastStore;
    return {
      topic: Object.fromEntries(currentStore.topic),
      subTopic: Object.fromEntries(currentStore.subTopic),
      todo: Object.fromEntries(currentStore.todo),
    };
  },
}));
