import { useEffect, useRef, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

type UserPresence = {
  presence_ref: string;
  userId: string;
  username: string;
};

export const useRealtimeUserSync = (channel: RealtimeChannel) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const hasSyncedRef = useRef(false);
  // 1. 유저 정보 세팅
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = getBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUsername(
          user.user_metadata?.nickname ||
            user.user_metadata?.name ||
            '이름없는 유저'
        );
      } else {
        const id = localStorage.getItem('guestId') ?? crypto.randomUUID();
        const name =
          localStorage.getItem('guestName') ??
          `게스트-${Math.floor(Math.random() * 1000)}`;

        localStorage.setItem('guestId', id);
        localStorage.setItem('guestName', name);

        setUserId(id);
        setUsername(name);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    console.log(channel);
    if (!channel) return;

    channel
      .on('presence', { event: 'sync' }, () => {
        hasSyncedRef.current = true;
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log(hasSyncedRef.current);
        if (!hasSyncedRef.current) return;
        newPresences.forEach((p) => {
          if (p.userId !== userId) {
            alert(`${p.username}님이 입장하셨습니다.`);
          }
        });
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        leftPresences.forEach((p) => {
          setTimeout(() => {
            const state = channel.presenceState();
            const users = Object.values(state).flat() as UserPresence[];
            const gone = !users.some((u) => u.userId === p.userId);
            if (gone) {
              alert(`${p.username}님이 퇴장하셨습니다.`);
            }
          }, 2000);
        });
      });
  }, [channel, userId, username]);
};
