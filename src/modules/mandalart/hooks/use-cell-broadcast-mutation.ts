import { RealtimeChannel } from '@supabase/supabase-js';
import { CellBroadCastParamsType } from '../types/realtime-type';
import { useMutation } from '@tanstack/react-query';
import { useCellOptimisticUpdater } from './use-optimistic-update';
import { useBroadcastStore } from './use-broadcast-store';
import * as Sentry from '@sentry/nextjs';
import { errorAlert } from '@/shared/utils/sweet-alert';

export const useCellBroadcastMutation = (myChannel: RealtimeChannel | null) => {
  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  const optimisticUpdate = useCellOptimisticUpdater();
  const mutationUpdateCache = useMutation({
    onMutate: (arg: CellBroadCastParamsType) => optimisticUpdate(arg),
    mutationFn: async (arg: CellBroadCastParamsType) => {
      if (!myChannel) throw new Error('채널없음');
      await myChannel.send({
        type: 'broadcast',
        event: 'shout',
        payload: arg,
      });
      addBroadcastStore(arg);
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart page');
        scope.setTag('feature', 'useCellBroadcastMutation');

        Sentry.captureException(
          new Error(`[useCellBroadcastMutation] ${error.message}`)
        );
      });
      errorAlert('실시간 편집 중 오류가 발생했습니다.', error.message);
    },
  });

  return { ...mutationUpdateCache };
};
