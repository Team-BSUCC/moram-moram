'use client';

import { AvatarStack } from '@/modules/mandalart/components/avatar-stack';

import { useMemo } from 'react';
import { useRealtimePresenceRoom } from '../hooks/use-realtime-presence-room';

type AvatarProps = {
  roomName: string;
  username: string;
};

/**
 * 방에 접속한 유저의 정보를 받아 배열로 변환하는 컴포넌트
 * @param roomName - 연결할 방 이름
 * @param nickname - 사용자 닉네임
 */
export const RealtimeAvatarStack = ({ roomName, username }: AvatarProps) => {
  // 접속해있는 유저 정보 받아오기
  const { users: usersMap } = useRealtimePresenceRoom(roomName, username);

  //[{name: 이름, image: 이미지 주소}, {} ...] 형태로 반환
  const avatars = useMemo(() => {
    return Object.values(usersMap).map((user) => ({
      name: user.name,
      image: user.image,
    }));
  }, [usersMap]);

  return <AvatarStack avatars={avatars} />;
};
