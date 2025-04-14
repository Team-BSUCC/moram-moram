'use client';

import { useEffect, useState } from 'react';
import { useCurrentUserImage } from './use-current-user-image';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

const supabase = getBrowserClient();

export type RealtimeUser = {
  id: string;
  name: string;
  image: string;
};

/**
 * 특정 방에 접속한 사용자들의 실시간 presence 정보를 제공하는 훅
 * @param roomName - 채널명
 * @returns - 방에 있는 사용자들의 정보
 */
export const useRealtimePresenceRoom = (roomName: string, username: string) => {
  // 현재 나의 이미지와 이름 받아오기
  const currentUserImage = useCurrentUserImage();
  const currentUserName = username;

  const [users, setUsers] = useState<Record<string, RealtimeUser>>({});

  useEffect(() => {
    const room = supabase.channel(roomName);

    room
      .on('presence', { event: 'sync' }, () => {
        // 현재 방의 상태 가져오기
        const newState = room.presenceState<{ image: string; name: string }>();

        // presence 상태를 사용자별 객체로 변환
        // newState는 { userId: [{ name: '이름', image: 'URL' }] } 형태
        // { userId: { name: '이름', image: 'URL' } } 형태로 변환
        const newUsers = Object.fromEntries(
          Object.entries(newState).map(([key, values]) => [
            key,
            { name: values[0].name, image: values[0].image },
          ])
        ) as Record<string, RealtimeUser>;
        setUsers(newUsers);
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return;
        }

        // 내 정보를 등록
        await room.track({
          name: currentUserName,
          image: currentUserImage,
        });
      });

    return () => {
      room.unsubscribe();
    };
  }, [roomName, currentUserName, currentUserImage]);

  return { users };
};
