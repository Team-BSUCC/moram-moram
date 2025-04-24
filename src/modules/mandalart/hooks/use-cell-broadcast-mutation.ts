import { RealtimeChannel } from '@supabase/supabase-js';
import { CellBroadCastParamsType } from '../types/realtime-type';
import { useMutation } from '@tanstack/react-query';
import { useCellOptimisticUpdater } from '../services/optimistic-update';
import { useBroadcastStore } from './use-broadcast-store';
// import { useBroadcastStore } from './use-broadcast-store';

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
      /**
       * TODO: error 핸들링 sentry 리팩터링
       */
      console.error('broadcast에 오류가 발생했습니다.', error);
    },
  });

  return { ...mutationUpdateCache };
};
