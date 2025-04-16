'use client';

import { Cursor } from '@/modules/mandalart/components/cursor';
import { useRealtimeCursors } from '../hooks/use-realtime-cursors';

const THROTTLE_MS = 50;

type RealtimeCursorsProps = {
  roomName: string;
  username: string;
  userId: string;
};

/**
 * 실시간 마우스 커서 UI 컴포넌트
 * @param roomName - 채널명
 * @param username - 유저 닉네임
 * @param userId - 유저 아이디 (중복 커서 방지용)
 * @returns
 */
export const RealtimeCursors = ({
  roomName,
  username,
  userId,
}: RealtimeCursorsProps) => {
  const { cursors } = useRealtimeCursors({
    roomName,
    username,
    userId,
    throttleMs: THROTTLE_MS,
  });

  return (
    <div>
      {Object.keys(cursors).map((id) => (
        <Cursor
          key={id}
          className='fixed z-50 transition-transform ease-in-out'
          style={{
            transitionDuration: '20ms',
            top: 0,
            left: 0,
            transform: `translate(${cursors[id].position.x}px, ${cursors[id].position.y}px)`,
          }}
          color={cursors[id].color}
          name={cursors[id].user.name}
        />
      ))}
    </div>
  );
};
