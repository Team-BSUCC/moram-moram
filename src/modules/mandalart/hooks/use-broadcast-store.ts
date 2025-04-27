import { create } from 'zustand';

/* eslint-disable indent */
import {
  ReceiveBroadCastPayload,
  BroadcastStoreType,
  FormatBroadcastStorePayloadType,
} from '../types/realtime-type';
import { mandalartBatchUpdateSupabase } from '../services/fetch-mandalart-batch-update-supabase-service';

// 브로드캐스트 스토어 상태 타입
type BroadcastStoreStateType = {
  broadcastStore: BroadcastStoreType;
  addBroadcastStore: (payload: ReceiveBroadCastPayload) => void;
  batchUpdateSupabase: () => Promise<boolean | void>;
  formatBroadcastStorePayload: () => FormatBroadcastStorePayloadType;
};

/**
 * 배치업데이트를 위한 저장소(broadcastStore)를 조작하는 store
 *   - broadcastStore : 배치업데이트를 위해 변경 정보를 저장하는 객체, 렌더링에는 영향 없음
 *   - addBroadcastStore: 브로드캐스트 스토어에 데이터(payload) 추가 함수
 *   - batchUpdateSupabase: Supabase에 일괄 업데이트를 수행하는 함수
 *   - formatBroadcastStorePayload: 브로드캐스트 스토어 페이로드 형식화 함수
 */
export const useBroadcastStore = create<BroadcastStoreStateType>((_, get) => ({
  broadcastStore: {
    core: new Map(),
    topic: new Map(),
    subTopic: new Map(),
    todo: new Map(),
  },

  /**
   * 브로드캐스트 스토어에 업데이트할 항목을 추가하는 함수
   * @param payload - 저장할 항목 데이터
   */
  addBroadcastStore: (payload: ReceiveBroadCastPayload) => {
    const currentStore = get().broadcastStore;
    switch (payload.action) {
      case 'core':
        currentStore.core.set(payload.value.id, payload);
        break;
      case 'topic':
        currentStore.topic.set(payload.value.id, payload);
        break;
      case 'subTopic':
        currentStore.subTopic.set(payload.value.id, payload);
        break;
      //투두일때 "CREATE,DELETE,UPDATE"
      default:
        currentStore.todo.set(payload.value.id, payload);
    }
  },

  /**
   * @todo : 업데이트성공시 뜨는 코솔 토스트 창으로 수정할 것
   * 브로드캐스트 스토어에 저장된 업데이트 내용을 Supabase에 일괄 적용하는 함수
   * 성공 시 브로드캐스트 스토어를 초기화함
   */
  batchUpdateSupabase: async () => {
    try {
      const currentStore = get().broadcastStore;
      if (
        currentStore.core.size === 0 &&
        currentStore.topic.size === 0 &&
        currentStore.subTopic.size === 0 &&
        currentStore.todo.size === 0
      ) {
        return;
      }
      await mandalartBatchUpdateSupabase(currentStore);
      // 업데이트 후 스토어 초기화
      currentStore.core.clear();
      currentStore.topic.clear();
      currentStore.subTopic.clear();
      currentStore.todo.clear();
      return true;
    } catch (error) {
      return false;
      console.error('배치 업데이트 중 오류 발생:', error);
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
      core: Object.fromEntries(currentStore.core),
      topic: Object.fromEntries(currentStore.topic),
      subTopic: Object.fromEntries(currentStore.subTopic),
      todo: Object.fromEntries(currentStore.todo),
    };
  },
}));
