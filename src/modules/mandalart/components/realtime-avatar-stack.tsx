'use client';

import { AvatarStack } from '@/modules/mandalart/components/avatar-stack';

import { useUsersStore } from '../hooks/use-users-store';

export const RealtimeAvatarStack = () => {
  // 접속해있는 유저 정보 받아오기
  const usersMap = useUsersStore((store) => store.currentUsers);

  return <AvatarStack avatars={usersMap} />;
};
