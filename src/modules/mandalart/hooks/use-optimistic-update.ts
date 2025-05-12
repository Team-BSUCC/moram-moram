/* eslint-disable indent */
import { useClientStateStore } from './use-client-state-store';
import {
  CellBroadCastParamsType,
  TodoBroadCastType,
} from '../types/realtime-type';

export const useTodoOptimisticUpdater = () => {
  const setTodo = useClientStateStore((state) => state.setTodoItem);
  const removeTodo = useClientStateStore((state) => state.removeTodoItem);

  return (data: TodoBroadCastType) => {
    if (data.action === 'UPDATE' || data.action === 'CREATE') {
      setTodo(`${data.value.cellId}-${data.value.id}`, data.value);
    } else if (data.action === 'DELETE') {
      removeTodo(`${data.value.cellId}-${data.value.id}`);
    }
  };
};

export const useCellOptimisticUpdater = () => {
  const setCore = useClientStateStore((state) => state.setCoreItem);
  const setTopic = useClientStateStore((state) => state.setTopicItem);
  const setSubTopic = useClientStateStore((state) => state.setSubTopicItem);

  return (data: CellBroadCastParamsType) => {
    switch (data.action) {
      case 'core':
        setCore(data.value);
        break;
      case 'topic':
        setTopic(data.value.id, data.value);
        break;
      case 'subTopic':
        setSubTopic(`${data.value.topicId}-${data.value.id}`, data.value);
        break;
      default:
        throw new Error('Failed to Update');
    }
  };
};
