'use client';

import { AvatarStack } from '@/modules/mandalart/components/avatar-stack';

import { useMemo } from 'react';
import { useUsersStore } from '../hooks/use-users-store';

export const RealtimeAvatarStack = () => {
  // 접속해있는 유저 정보 받아오기
  const usersMap = useUsersStore((store) => store.currentUsers);

  //[{name: 이름, image: 이미지 주소}, {} ...] 형태로 반환
  const avatars = useMemo(() => {
    return Object.values(usersMap).map((user) => ({
      name: user.name,
      image: user.image,
    }));
  }, [usersMap]);

  return <AvatarStack avatars={avatars} />;
};
