import { RealtimeChannel } from '@supabase/supabase-js';
import { TodoPayloadType } from '../types/realtime-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { judgingAction } from '../services/judging-action';

export const useTodoBroadcastMutation = (
  myChannel: RealtimeChannel,
  todoRowData: TodoPayloadType
) => {
  const queryClient = useQueryClient();

  const todoListKey: readonly unknown[] = QUERY_KEY.todoList(
    todoRowData.cell_id
  );

  const mutationUpdateCache = useMutation({
    onMutate: async () => judgingAction(queryClient, todoListKey, todoRowData),
    mutationFn: async () => {
      if (!myChannel) throw new Error('채널없음');
      await myChannel.send({
        type: 'broadcast',
        event: 'shout',
        payload: todoRowData,
      });
    },
    onError: () => {
      /**
       * TODO: error 핸들링 sentry 리팩터링
       */
      console.error('broadcast에 오류가 발생했습니다.');
    },
  });

  return { ...mutationUpdateCache };
};
