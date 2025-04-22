import { useMutation } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

type CreateRoomParams = {
  userId: string;
  title: string;
  color: number;
  subTitle?: string;
  startDate?: string; // 'YYYY-MM-DD'
  endDate?: string; // 'YYYY-MM-DD'
};
/**
 * 만다라트 데이터 생성 뮤테이션
 * @returns 성공 여부를 반환 해줍니다.
 */
export const useCreateRoom = () => {
  const supabase = getBrowserClient();
  return useMutation<string, PostgrestError, CreateRoomParams>({
    mutationFn: async ({
      userId,
      title,
      color,
      subTitle,
      startDate,
      endDate,
    }) => {
      const { data, error } = await supabase.rpc('create_full_room_flow', {
        _user_id: userId,
        _title: title,
        _color: color,
        _sub_title: subTitle ?? null,
        _start_date: startDate ?? null,
        _end_date: endDate ?? null,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
};
