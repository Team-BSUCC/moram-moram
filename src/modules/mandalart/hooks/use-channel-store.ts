import { create } from 'zustand';
import { RealtimeChannel } from '@supabase/supabase-js';

type ChannelStore = {
  channel: RealtimeChannel | null;
  setChannel: (ch: RealtimeChannel) => void;
  resetChannel: () => void;
};

export const useChannelStore = create<ChannelStore>((set) => ({
  channel: null,
  setChannel: (ch) => set({ channel: ch }),
  resetChannel: () => set({ channel: null }),
}));
