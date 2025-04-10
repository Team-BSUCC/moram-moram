'use client';

import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

type Props = {
  user: {
    id: string;
    user_metadata: {
      name?: string;
      nickname?: string;
    };
  } | null;
};

type UserPresence = {
  presence_ref: string;
  userId: string;
  username: string;
};

type PresenceJoinPayload = {
  newPresences: UserPresence[];
};

type PresenceLeavePayload = {
  leftPresences: UserPresence[];
};

type BroadcastEventPayload = {
  payload: UserPresence;
};

export default function RealtimeRoom({ user }: Props) {
  const supabase = getBrowserClient();
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>();
  const [joinNotice, setJoinNotice] = useState<string | null>(null);
  const [leaveNotice, setLeaveNotice] = useState<string | null>(null);
  const [users, setUsers] = useState<UserPresence[]>([]);

  // 회원, 비회원 정보 세팅
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setUsername(user.user_metadata.name || user.user_metadata.nickname);
    } else {
      // 비회원인 경우 localStorage에서 guest 정보
      let id = localStorage.getItem('guestId');
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('guestId', id);
      }

      let name = localStorage.getItem('guestName');
      if (!name) {
        name = `게스트-${Math.floor(Math.random() * 1000)}`;
        localStorage.setItem('guestName', name);
      }

      setUserId(id);
      setUsername(name);
    }
  }, [user]);

  // 2. Supabase Realtime 채널 연결
  useEffect(() => {
    if (!userId || !username) {
      return;
    }
    const channel = supabase.channel('room-1', {
      config: {
        presence: { key: userId },
      },
    });

    setChannel(channel);

    channel.subscribe(async (status: string) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ userId, username });

        // 입장 broadcast (본인 제외 모두에게 전달)
        channel.send({
          type: 'broadcast',
          event: 'user_joined',
          payload: { userId, username },
        });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId, username]);

  useEffect(() => {
    if (!channel) return;

    // sync userState에서 중복된 접속 막기
    channel.on('presence', { event: 'sync' }, () => {
      const userState = channel.presenceState();
      const uniqueUsers = new Map<string, UserPresence>();
      // eslint-disable-next-line no-unused-vars
      for (const [_, presences] of Object.entries(userState)) {
        for (const presence of presences as UserPresence[]) {
          if (!uniqueUsers.has(presence.userId)) {
            uniqueUsers.set(presence.userId, presence);
          }
        }
      }
      const users = Array.from(uniqueUsers.values());
      setUsers(users);
    });

    // join이 일어났을 때
    channel.on(
      'presence',
      { event: 'join' },
      ({ newPresences }: PresenceJoinPayload) => {
        newPresences.forEach(({ username }) => {
          setJoinNotice(`${username}님이 입장했습니다`);
          setTimeout(() => setJoinNotice(null), 1500);
        });
      }
    );

    // leave가 일어났을 때
    channel.on(
      'presence',
      { event: 'leave' },
      ({ leftPresences }: PresenceLeavePayload) => {
        leftPresences.forEach(({ username }) => {
          setLeaveNotice(`${username}님이 퇴장했어요`);
          setTimeout(() => setLeaveNotice(null), 1500);
        });
      }
    );

    // broadcast 수신
    channel.on(
      'broadcast',
      { event: 'user_joined' },
      ({ payload }: BroadcastEventPayload) => {
        if (payload.userId !== userId) {
          setJoinNotice(`${payload.username}님이 들어왔어요`);
          setTimeout(() => setJoinNotice(null), 1500);
        }
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, [channel]);

  return (
    <div className='p-4'>
      <h2 className='mb-2 text-xl font-bold'>현재 접속 중인 유저:</h2>
      <ul className='list-inside list-disc'>
        {users.map((u) => (
          <li key={u.userId}>{u.username}</li>
        ))}
      </ul>
      {/* 알림 메시지 */}
      {joinNotice && (
        <div className='m-4 border bg-purple-pastel p-2'>{joinNotice}</div>
      )}
      {leaveNotice && (
        <div className='mt-4 border bg-red-pastel p-2'>{leaveNotice}</div>
      )}
    </div>
  );
}
