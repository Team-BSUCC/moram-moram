/* eslint-disable indent */
import { useClientStateStore } from '../hooks/use-client-state-store';
import { ReceiveBroadCastPayload } from '../types/realtime-type';

export const useReceiveBroadCastUpdater = () => {
  const setCore = useClientStateStore((state) => state.setCoreItem);
  const setTopic = useClientStateStore((state) => state.setTopicItem);
  const setSubTopic = useClientStateStore((state) => state.setSubTopicItem);
  const setTodo = useClientStateStore((state) => state.setTodoItem);
  const removeTodo = useClientStateStore((state) => state.removeTodoItem);

  return (payload: ReceiveBroadCastPayload) => {
    switch (payload.action) {
      case 'core':
        setCore(payload.value);
        break;
      case 'topic':
        setTopic(payload.value.id, payload.value);
        break;
      case 'subTopic':
        setSubTopic(
          `${payload.value.topicId}-${payload.value.id}`,
          payload.value
        );
        break;
      case 'CREATE':
        setTodo(`${payload.value.cellId}-${payload.value.id}`, payload.value);
        break;
      case 'UPDATE':
        setTodo(`${payload.value.cellId}-${payload.value.id}`, payload.value);
        break;
      case 'DELETE':
        removeTodo(`${payload.value.cellId}-${payload.value.id}`);
        break;
      default:
        throw new Error('동기화 실패');
    }
  };
};
