'use client';

import { Cursor } from '@/modules/mandalart/components/cursor';
import { useRealtimeCursors } from '../hooks/use-realtime-cursors';

const THROTTLE_MS = 50;

type RealtimeCursorsProps = {
  roomName: string;
  username: string;
  userId: string;
  boardRef: React.RefObject<HTMLDivElement>;
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
  boardRef,
}: RealtimeCursorsProps) => {
  const { cursors } = useRealtimeCursors({
    roomName,
    username,
    userId,
    boardRef,
    throttleMs: THROTTLE_MS,
  });

  return (
    <div>
      {Object.keys(cursors).map((id) => {
        const rect = boardRef.current?.getBoundingClientRect();
        if (!rect) return null;
        const x = cursors[id].position.x * rect.width + rect.left;
        const y = cursors[id].position.y * rect.height + rect.top;
        return (
          <Cursor
            key={id}
            className='fixed z-50 transition-transform ease-in-out'
            style={{
              transitionDuration: '20ms',
              top: 0,
              left: 0,
              transform: `translate(${x}px, ${y - 20}px)`,
            }}
            color={cursors[id].color}
            name={cursors[id].user.name}
          />
        );
      })}
    </div>
  );
};
