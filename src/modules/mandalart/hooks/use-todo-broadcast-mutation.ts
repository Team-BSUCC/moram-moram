import { RealtimeChannel } from '@supabase/supabase-js';
import {
  ReceiveBroadCastPayload,
  TodoBroadCastType,
} from '../types/realtime-type';
import { useMutation } from '@tanstack/react-query';
import { useTodoOptimisticUpdater } from '../services/optimistic-update';
import * as Sentry from '@sentry/nextjs';
import { errorAlert } from '@/shared/utils/sweet-alert';
import { useBroadcastStore } from './use-broadcast-store';
// import { useBroadcastStore } from './use-broadcast-store';

export const useTodoBroadcastMutation = (myChannel: RealtimeChannel | null) => {
  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  const optimisticUpdate = useTodoOptimisticUpdater();
  const mutationUpdateCache = useMutation({
    onMutate: (arg: TodoBroadCastType) => optimisticUpdate(arg),
    mutationFn: async (arg: TodoBroadCastType) => {
      if (!myChannel) throw new Error('채널없음');

      await myChannel.send({
        type: 'broadcast',
        event: 'shout',
        payload: arg,
      });
      addBroadcastStore(arg as ReceiveBroadCastPayload);
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart page');
        scope.setTag('feature', 'useTodoBroadcastMutation');

        Sentry.captureException(
          new Error(`[useTodoBroadcastMutation] ${error.message}`)
        );
      });
      errorAlert('broadcast에 오류가 발생했습니다!');
    },
  });

  return { ...mutationUpdateCache };
};
