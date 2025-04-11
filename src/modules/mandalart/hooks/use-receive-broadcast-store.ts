import { useQueryClient } from '@tanstack/react-query';
import { FormatBroadcastStorePayloadType } from '../types/realtime-type';
import { useBroadcastStore } from './use-broadcast-store';
import { QUERY_KEY } from '@/shared/constants/query-key';

export const useReceiveBroadcastStore = (
  payloadBroadcastStore: FormatBroadcastStorePayloadType
) => {
  /**
   * @todo : 나중에 투두 찍어내는 로직 확실해지면 추가 작업예정, 소주제를 구분할 수 있는 쿼리키가 추가되어야 할 듯
   * 브로드캐스트 스토어 페이로드를 수신하여 로컬 만다라트상태를 업데이트하는 함수
   * @param payloadBroadcastStore - 수신된 브로드캐스트 스토어 페이로드
   */
  const broadcastStore = useBroadcastStore((state) => state.broadcastStore);
  const queryClient = useQueryClient();

  //브로드캐스트 스토어 받은 페이로드로 변경
  broadcastStore.core = new Map(
    Object.entries(payloadBroadcastStore.core) || {}
  );
  broadcastStore.topic = new Map(
    Object.entries(payloadBroadcastStore.topic || {})
  );
  broadcastStore.subTopic = new Map(
    Object.entries(payloadBroadcastStore.subTopic || {})
  );
  broadcastStore.todo = new Map(
    Object.entries(payloadBroadcastStore.todo || {})
  );

  // 쿼리 캐시 업데이트
  if (broadcastStore.core.size !== 0) {
    broadcastStore.topic.forEach((corePayload, coreId) => {
      queryClient.setQueryData(QUERY_KEY.core(coreId), corePayload.value);
    });
  }
  if (broadcastStore.topic.size !== 0) {
    broadcastStore.topic.forEach((topicPayload, topicId) => {
      queryClient.setQueryData(QUERY_KEY.topic(topicId), topicPayload.value);
    });
  }
  if (broadcastStore.subTopic.size !== 0) {
    broadcastStore.subTopic.forEach((subtopicPayload, subtopicId) => {
      queryClient.setQueryData(
        QUERY_KEY.subtopic(subtopicId),
        subtopicPayload.value
      );
    });
  }
  if (broadcastStore.todo.size !== 0) {
    broadcastStore.todo.forEach((todoPayload, todoId) => {
      if (todoPayload.action !== 'DELETE') {
        queryClient.setQueryData(QUERY_KEY.todo(todoId), todoPayload.value);
      }
    });
  }
};
