'use client';

import { useEffect, useRef } from 'react';
import { useCurrentUserImage } from './use-current-user-image';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useBroadcastStore } from './use-broadcast-store';
import { useReceiveBroadcastStore } from './use-receive-broadcast-store';
import { checkUserJoinTime } from '../utils/check-user-join-time';
import { isRegisteredUser } from '../utils/is-registered-user';
import { useUsersStore } from './use-users-store';

const supabase = getBrowserClient();

export type RealtimeUser = {
  name: string;
  image: string;
};

export type UserInfoType = {
  image: string;
  name: string;
  joinTime: number;
  presence_ref: string;
};

/**
 * 특정 방에 접속한 사용자들의 실시간 presence 정보를 제공하는 훅
 * @param roomName - 채널명
 * @returns - 방에 있는 사용자들의 정보
 */
export const useRealtimePresenceRoom = (roomName: string, username: string) => {
  // 현재 나의 이미지와 이름 받아오기

  const myJoinTime = useRef<number>(Date.now());

  const { receiveBroadcastStore } = useReceiveBroadcastStore();
  const formatBroadcastStorePayload = useBroadcastStore(
    (state) => state.formatBroadcastStorePayload
  );
  const setCurrentUsers = useUsersStore((store) => store.setCurrentUsers);
  const setLeftUsers = useUsersStore((store) => store.setLeftUsers);
  const currentUserImage = useCurrentUserImage();

  const currentUserName = username;

  useEffect(() => {
    const room = supabase.channel(roomName);

    room.on('presence', { event: 'sync' }, () => {
      // 현재 방의 접속자업데이트
      const currentUsersInfo = room.presenceState<UserInfoType>();
      setCurrentUsers(currentUsersInfo);

      //새로들어온 사용자면 브로드캐스트로주고받은 정보 요청
      const { firstUserJoinTime, newUserJoinTime, isNewUser } =
        checkUserJoinTime(currentUsersInfo, myJoinTime.current);
      if (isNewUser) {
        room.send({
          type: 'broadcast',
          event: 'request_broadcasts_store',
          payload: { firstUserJoinTime, newUserJoinTime },
        });
      }
    });

    room.on('presence', { event: 'leave' }, (payload) => {
      const leftUser = payload.leftPresences[0] as unknown as UserInfoType;
      if (isRegisteredUser(leftUser.name)) {
        setLeftUsers(leftUser);
      }
    });

    //가장 먼저 들어온 유저면 브로드캐스트스토어 보내주기(request_broadcasts_store에 대한 응답을 보내줌)
    room.on('broadcast', { event: 'request_broadcasts_store' }, (payload) => {
      if (payload.payload.firstUserJoinTime === myJoinTime.current) {
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
        receiveBroadcastStore(payload.payload.broadCastStore);
      }
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
};
