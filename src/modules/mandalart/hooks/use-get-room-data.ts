import { Tables } from '@/shared/types/database.types';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

/**
 *
 * @param user
 * @param roomId
 * @returns roomData : 접속한 만다라트 룸테이블의 정보를 저장하는 state
 */
export const useGetRoomData = (user: User | null, roomId: string) => {
  const [roomData, setRoomData] = useState<Tables<'rooms'> | null>(null);
  const supabase = getBrowserClient();
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
    if (user) fetchGetRoomPassword();
  }, []);

  return { roomData };
};
