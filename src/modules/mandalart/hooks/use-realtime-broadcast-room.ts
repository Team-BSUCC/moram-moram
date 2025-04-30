import { useBroadcastStore } from './use-broadcast-store';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useEffect } from 'react';
import { useReceiveBroadCastUpdater } from './use-receive-broadcast-update';
import { useChannelStore } from './use-channel-store';

export const useRealtimeBroadCastRoom = (roomName: string) => {
  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  const setChannel = useChannelStore((state) => state.setChannel);
  const handleSynchronization = useReceiveBroadCastUpdater();

  const supabase = getBrowserClient();

  useEffect(() => {
    const channel = supabase.channel(roomName);

    channel.on('broadcast', { event: 'shout' }, (payload) => {
      handleSynchronization(payload.payload);
      addBroadcastStore(payload.payload);
    });

    channel.subscribe();
    setChannel(channel);
    return () => {
      channel.unsubscribe();
    };
  }, []);
};
