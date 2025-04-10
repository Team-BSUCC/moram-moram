import { RealtimeChannel } from '@supabase/supabase-js';
import { QueryKey } from '@tanstack/react-query';
import { BroadcastPayloadType } from '../types/realtime-type';

type BroadcastSenderParams = {
  myChannel: RealtimeChannel;
  stateKey: QueryKey;
  props: Partial<BroadcastPayloadType>;
};

export const broadcastEventSender = ({
  myChannel,
  stateKey,
  props,
}: BroadcastSenderParams): Promise<Partial<BroadcastPayloadType>> => {
  return new Promise((resolve, reject) => {
    try {
      const payload = {
        category: stateKey[0],
        ...props,
      };

      myChannel?.send({
        type: 'broadcast',
        event: 'shout',
        payload: payload,
      });
      resolve(props);
    } catch (error) {
      reject(error);
    }
  });
};
