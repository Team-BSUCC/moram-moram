'use client';

import { useEffect, useRef, useState } from 'react';
import { useCurrentUserImage } from './use-current-user-image';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useFieldArray } from 'react-hook-form';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import { useCurrentUserId } from './use-current-user-id';

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
  const joinTime = useRef<number>(Date.now());
  useEffect(() => {
    const room = supabase.channel(roomName);

    room.on('presence', { event: 'sync' }, () => {
      // 현재 방의 상태 가져오기
      const allUsersInfo = room.presenceState<{
        image: string;
        name: string;
        joinTime: number;
      }>();

      // presence 상태를 사용자별 객체로 변환
      // newState는 { userId: [{ name: '이름', image: 'URL' }] } 형태
      // { userId: { name: '이름', image: 'URL' } } 형태로 변환
      const formattingAllUsersInfo = Object.fromEntries(
        Object.entries(allUsersInfo).map(([key, values]) => [
          key,
          { name: values[0].name, image: values[0].image },
        ])
      ) as Record<string, RealtimeUser>;
      console.log('내참여시간', joinTime.current);

      //가장 먼저 들어온 유저의 접속시간 찾기
      let firstUserJoinTime = joinTime.current;
      Object.values(allUsersInfo).forEach((userInfo) => {
        firstUserJoinTime =
          userInfo[0].joinTime < firstUserJoinTime
            ? userInfo[0].joinTime
            : firstUserJoinTime;
      });

      //내가 가장 먼저 들어온 사람이 아니면 다른 유저한테 브로드캐스트스토어 보내달라고 요청보내기
      if (firstUserJoinTime !== joinTime.current)
        room.send({
          type: 'broadcast',
          event: 'request_broadcasts_store',
          payload: { firstUserJoinTime, newUserJoinTime: joinTime.current },
        });
      setUsers(formattingAllUsersInfo);
    });

    //가장 먼저 들어온 유저면 브로드캐스트스토어 보내주기
    room.on('broadcast', { event: 'request_broadcasts_store' }, (payload) => {
      console.log('페이로드', payload);
    });

    //브로드캐스트스토어 요청보낸 유저면 브로드캐스트응답받아서 변경상태동기화
    room.on('broadcast', { event: 'response_broadcasts_store' }, (payload) => {
      console.log('브로드캐스트동기화완료');
    });

    room.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }
      // 내 정보를 등록
      await room.track({
        joinTime: joinTime.current,
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

// import { useEffect, useRef, useState } from 'react';
// import { RealtimeChannel } from '@supabase/supabase-js';
// import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

// type UserPresence = {
//   presence_ref: string;
//   userId: string;
//   username: string;
// };

// export const useRealtimeUserSync = (channel: RealtimeChannel) => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [username, setUsername] = useState<string | null>(null);
//   const hasSyncedRef = useRef(false);
//   // 1. 유저 정보 세팅
//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = getBrowserClient();
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user) {
//         setUserId(user.id);
//         setUsername(
//           user.user_metadata?.nickname ||
//             user.user_metadata?.name ||
//             '이름없는 유저'
//         );
//       } else {
//         const id = localStorage.getItem('guestId') ?? crypto.randomUUID();
//         const name =
//           localStorage.getItem('guestName') ??
//           `게스트-${Math.floor(Math.random() * 1000)}`;

//         localStorage.setItem('guestId', id);
//         localStorage.setItem('guestName', name);

//         setUserId(id);
//         setUsername(name);
//       }
//     };
//     fetchUser();
//   }, []);
//   useEffect(() => {
//     console.log(channel);
//     if (!channel) return;

//     channel
//       .on('presence', { event: 'sync' }, () => {
//         hasSyncedRef.current = true;
//       })
//       .on('presence', { event: 'join' }, ({ newPresences }) => {
//         console.log(hasSyncedRef.current);
//         if (!hasSyncedRef.current) return;
//         newPresences.forEach((p) => {
//           if (p.userId !== userId) {
//             alert(`${p.username}님이 입장하셨습니다.`);
//           }
//         });
//       })
//       .on('presence', { event: 'leave' }, ({ leftPresences }) => {
//         leftPresences.forEach((p) => {
//           setTimeout(() => {
//             const state = channel.presenceState();
//             const users = Object.values(state).flat() as UserPresence[];
//             const gone = !users.some((u) => u.userId === p.userId);
//             if (gone) {
//               alert(`${p.username}님이 퇴장하셨습니다.`);
//             }
//           }, 2000);
//         });
//       });
//   }, [channel, userId, username]);
// };
