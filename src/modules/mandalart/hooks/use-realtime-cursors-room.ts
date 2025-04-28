import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 콜백 함수를 일정 시간 간격으로 제한(throttle)합니다.
 * 마지막 호출의 인자를 사용하여, 지정된 지연 시간(delay)이 지난 경우에만 콜백이 실행됩니다.
 */
const useThrottleCallback = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
  delay: number
) => {
  const lastCall = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Params) => {
      const now = Date.now();
      const remainingTime = delay - (now - lastCall.current);

      if (remainingTime <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        lastCall.current = now;
        callback(...args);
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          lastCall.current = Date.now();
          timeout.current = null;
          callback(...args);
        }, remainingTime);
      }
    },
    [callback, delay]
  );
};

const supabase = getBrowserClient();

const generateRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

const EVENT_NAME = 'realtime-cursor-move';

type CursorEventPayload = {
  position: {
    x: number;
    y: number;
  };
  user: {
    id: string;
    name: string;
  };
  color: string;
  timestamp: number;
};

export const useRealtimeCursors = ({
  roomName,
  username,
  userId: id,
  throttleMs,
  boardRef,
}: {
  roomName: string;
  username: string;
  userId: string;
  throttleMs: number;
  boardRef: React.RefObject<HTMLDivElement>;
}) => {
  const [color] = useState(generateRandomColor());
  const [userId] = useState(id);
  const [cursors, setCursors] = useState<Record<string, CursorEventPayload>>(
    {}
  );

  const channelRef = useRef<RealtimeChannel | null>(null);
  const isVisible = useFloatingSheetStore((state) => state.isVisible);

  const callback = useCallback(
    (event: MouseEvent) => {
      if (isVisible || !boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const payload: CursorEventPayload = {
        position: {
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        },
        user: {
          id: userId,
          name: username,
        },
        color: color,
        timestamp: new Date().getTime(),
      };

      channelRef.current?.send({
        type: 'broadcast',
        event: EVENT_NAME,
        payload: payload,
      });
    },
    [color, userId, username, isVisible]
  );

  const handleMouseMove = useThrottleCallback(callback, throttleMs);

  useEffect(() => {
    const channel = supabase.channel(roomName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channelRef.current = channel;

    channel.on(
      'broadcast',
      { event: EVENT_NAME },
      (data: { payload: CursorEventPayload }) => {
        const { user } = data.payload;
        if (user.id === userId) return;

        setCursors((prev) => ({
          ...prev,
          [user.id]: data.payload,
        }));
      }
    );

    // 유저가 채널을 나가면 커서가 사라지도록 하는 로직
    channel.on('presence', { event: 'leave' }, ({ key }) => {
      setCursors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        channel.track({
          name: username,
          color,
        });
      }
    });

    // 화면에 포커스가 없을 경우 timestamp를 0으로 지정
    const handleBlur = () => {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;

      channelRef.current?.send({
        type: 'broadcast',
        event: EVENT_NAME,
        payload: {
          position: { x: 0, y: 0 },
          user: { id: userId, name: username },
          color,
          timestamp: 0,
        },
      });
    };
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('blur', handleBlur);
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 마우스가 움직일 때 실행될 이벤트 리스너를 추가합니다
    window.addEventListener('mousemove', handleMouseMove);

    // 클린업 함수
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return { cursors };
};
