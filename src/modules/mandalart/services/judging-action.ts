import { QueryClient } from '@tanstack/react-query';
import { TodoPayloadType } from '../types/realtime-type';

export const judgingAction = (
  queryClient: QueryClient,
  key: readonly unknown[],
  todoRowValue: TodoPayloadType
) => {
  if (todoRowValue.action === 'UPDATE') {
    queryClient.setQueryData(key, (prev: TodoPayloadType[]) => {
      return prev.map((item) =>
        item.id === todoRowValue.id ? todoRowValue : item
      );
    });
    return;
  }

  if (todoRowValue.action === 'CREATE') {
    queryClient.setQueryData(key, (prev: TodoPayloadType[]) => {
      return [...prev, todoRowValue];
    });
    return;
  }

  if (todoRowValue.action === 'DELETE') {
    queryClient.setQueryData(key, (prev: TodoPayloadType[]) => {
      return prev.filter((item) => item.id !== todoRowValue.id);
    });
    return;
  }
};
