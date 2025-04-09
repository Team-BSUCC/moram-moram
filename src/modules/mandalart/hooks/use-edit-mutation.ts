import { useMutation, useQueryClient } from '@tanstack/react-query';
import { processQueryKey } from '../services/process-query-key';
import { broadcastEventSender } from '../services/broadcast-event-sender';
import { RealtimeChannel } from '@supabase/supabase-js';
import { BroadcastPayloadType } from '../types/realtime-type';

export const useEditMutation = (
  myChannel: RealtimeChannel,
  props: Partial<BroadcastPayloadType>
) => {
  const queryClient = useQueryClient();

  const stateKey: readonly unknown[] = processQueryKey(props);

  const mutationUpdateCache = useMutation({
    onMutate: async () => {
      queryClient.setQueryData(stateKey, props.value);
    },
    mutationFn: async () => {
      broadcastEventSender({ myChannel, stateKey, props });
    },
    onError: () => {
      console.error('broadcast에 오류가 발생했습니다.');
    },
  });

  return { ...mutationUpdateCache };
};
