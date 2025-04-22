import { RealtimeChannel } from '@supabase/supabase-js';
import { TodoPayloadType } from '../types/realtime-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { judgingAction } from '../services/judging-action';
import { useBroadcastStore } from './use-broadcast-store';
import * as Sentry from '@sentry/nextjs';

export const useTodoBroadcastMutation = (
  myChannel: RealtimeChannel,
  todoRowData: TodoPayloadType
) => {
  const queryClient = useQueryClient();
  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  const todoListKey: readonly unknown[] = QUERY_KEY.todolist(
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
      addBroadcastStore(todoRowData);
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart page');
        scope.setTag('feature', 'mutationUpdateCache');

        Sentry.captureException(
          new Error(`[mutationUpdateCache] ${error.message}`)
        );
      });
    },
  });

  return { ...mutationUpdateCache };
};
