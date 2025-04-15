'use client';

import { useEffect, useRef, useState } from 'react';
import { useCurrentUserImage } from './use-current-user-image';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useBroadcastStore } from './use-broadcast-store';
import { useReceiveBroadcastStore } from './use-receive-broadcast-store';

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
  const myJoinTime = useRef<number>(Date.now());
  const { receiveBroadcastStore } = useReceiveBroadcastStore();
  const formatBroadcastStorePayload = useBroadcastStore(
    (state) => state.formatBroadcastStorePayload
  );
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

      //가장 먼저 들어온 유저의 접속시간 찾기

      const usersJoinTimeArr = Object.values(allUsersInfo)
        .filter((userInfo) => userInfo[0].joinTime)
        .map((userInfo) => {
          return userInfo[0].joinTime;
        });
      const firstUserJoinTime = Math.min(...usersJoinTimeArr);
      const newUserJoinTime = Math.max(...usersJoinTimeArr);

      //방금 들어온 사람이면 다른 유저한테 브로드캐스트스토어 보내달라고 요청보내기
      if (
        usersJoinTimeArr.length !== 1 &&
        newUserJoinTime === myJoinTime.current
      ) {
        console.log('나 마지막에 들어온 사람임 데이터 보내줘');
        room.send({
          type: 'broadcast',
          event: 'request_broadcasts_store',
          payload: { firstUserJoinTime, newUserJoinTime },
        });
      }
      setUsers(formattingAllUsersInfo);
    });

    //가장 먼저 들어온 유저면 브로드캐스트스토어 보내주기(request_broadcasts_store에 대한 응답을 보내줌)
    room.on('broadcast', { event: 'request_broadcasts_store' }, (payload) => {
      if (payload.payload.firstUserJoinTime === myJoinTime.current) {
        console.log('내가 첫번째유저다 데이터보내줄게');
        room.send({
          type: 'broadcast',
          event: 'response_broadcasts_store',
          payload: {
            newUserJoinTime: payload.payload.newUserJoinTime,
            broadCastStore: formatBroadcastStorePayload(),
          },
        });
      }
    });

    //브로드캐스트스토어 요청보낸 유저면 브로드캐스트응답받아서 변경상태동기화(request_broadcasts_store 받아서 처리)
    room.on('broadcast', { event: 'response_broadcasts_store' }, (payload) => {
      if (payload.payload.newUserJoinTime === myJoinTime.current) {
        console.log(
          payload.payload.broadCastStore,
          '++ 브로드 캐스트 받아서 처리하는 receiver함수실행'
        );
      }
      receiveBroadcastStore(payload.payload.broadCastStore);
    });

    room.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }
      // 내 정보를 등록
      await room.track({
        joinTime: myJoinTime.current,
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
