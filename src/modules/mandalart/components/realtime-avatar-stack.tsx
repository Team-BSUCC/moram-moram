'use client';

import { AvatarStack } from '@/modules/mandalart/components/avatar-stack';

import { useMemo } from 'react';
import { useRealtimePresenceRoom } from '../hooks/use-realtime-presence-room';

type Props = {
  roomName: string;
};

export const RealtimeAvatarStack = ({ roomName }: Props) => {
  const { users: usersMap } = useRealtimePresenceRoom(roomName);
  const avatars = useMemo(() => {
    return Object.values(usersMap).map((user) => ({
      name: user.name,
      image: user.image,
    }));
  }, [usersMap]);

  return <AvatarStack avatars={avatars} />;
};
