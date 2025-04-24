import { Tables } from '@/shared/types/database.types';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

/**
 *
 * @param user
 * @param roomId
 * @returns roomData : 접속한 만다라트 룸테이블의 정보를 저장하는 state
 *          updateRoomData : 룸데이터를 다시 불러오고 싶을때 실행
 *          isOwner : 인자의 user가 해당 room의 owner인지 판단
 */
export const useGetRoomData = (user: User | null, roomId: string) => {
  const [roomData, setRoomData] = useState<Tables<'rooms'> | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isUpdateRoomData, setIsUpdateRoomData] = useState<boolean>(true);
  const supabase = getBrowserClient();

  useEffect(() => {
    const fetchGetRoomOwner = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('owner')
        .eq('id', roomId)
        .single();
      if (error) {
        Sentry.withScope((scope) => {
          scope.setTag('page', 'mandalart page');
          scope.setTag('feature', 'fetchGetRoomOwner');

          Sentry.captureException(
            new Error(`[fetchGetRoomOwner] ${error.message}`)
          );
        });
      }
      if (data) {
        setIsOwner(user?.id === data.owner);
      }
    };
    if (user) fetchGetRoomOwner();
  }, []);

  useEffect(() => {
    const fetchGetRoomPassword = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();
      if (error) {
        //TODO 센트리로 처리하기
      }
      if (data) {
        setRoomData(data);
      }
    };
    if (isOwner) fetchGetRoomPassword();
  }, [isUpdateRoomData, isOwner]);

  const updateRoomData = () => {
    setIsUpdateRoomData(!isUpdateRoomData);
  };
  return { roomData, updateRoomData, isOwner };
};
