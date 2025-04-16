import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RealtimeChannel } from '@supabase/supabase-js';
import { BroadcastPayloadType } from '../types/realtime-type';
import { useBroadcastStore } from './use-broadcast-store';
import { getQueryKey } from '../services/get-data-category';

/**
 * 클라이언트 상태의 수정을 서버에 broadcast해주는 mutation
 * @param myChannel supabase.channel()를 가진 변수, 부모 컴포넌트와 채널을 동일하게 하기 위해 내려준다고 보면 됨
 * @param props mutation이 일어날 객체의 row값 + 변화된 현재 값 value
 * @returns 사실 mutate만 뽑아서 쓰면 될 것 같다... 다른 요소들은 필요한가? 잘 모르겠음!
 */
export const useBroadcastMutation = (
  myChannel: RealtimeChannel,
  payload: BroadcastPayloadType
) => {
  const queryClient = useQueryClient();
  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  queryClient.setQueryData(getQueryKey(payload), payload.value);

  const mutationUpdateCache = useMutation({
    onMutate: () => {},
    mutationFn: async () => {
      if (!myChannel) throw new Error('채널없음');
      await myChannel.send({
        type: 'broadcast',
        event: 'shout',
        payload,
      });
      addBroadcastStore(payload);
    },
    onError: (err) => {
      /**
       * TODO: error 핸들링 sentry 리팩토링
       */
      console.error('broadcast에 오류가 발생했습니다.', err);
    },
  });

  return { ...mutationUpdateCache };
};
