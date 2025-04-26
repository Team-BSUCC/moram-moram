import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import * as Sentry from '@sentry/nextjs';
import { useRoomDateUpdateParams } from '../types/dashboard-type';
import { errorAlert, successAlert } from '@/shared/utils/sweet-alert';

/**
 * 만다라트 날짜 수정 뮤테이션
 * @param mandalartId 만다라트 ID
 * @param startDate 시작 날짜
 * @param endDate 종료 날짜
 * @returns 성공 여부를 반환 해줍니다.
 */
export const useRoomDateUpdate = () => {
  const queryclient = useQueryClient();
  const supabase = getBrowserClient();
  return useMutation<string, PostgrestError, useRoomDateUpdateParams>({
    mutationFn: async ({ mandalartId, endDate }) => {
      const { data, error } = await supabase.rpc('update_mandalart_dates', {
        _mandalart_id: mandalartId,
        _end_date: endDate,
      });

      if (error) {
        Sentry.withScope((scope) => {
          scope.setTag('page', 'dashboard page');
          scope.setTag('feature', 'update_room_date_flow');

          Sentry.captureException(
            new Error(`[update_room_date_flow] ${error.message}`)
          );
        });
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      successAlert('수정 되었습니다.');
      queryclient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
    },
    onError: (error) => {
      errorAlert(`수정 과정에서 문제가 발생하였습니다., ${error.message}`);
    },
  });
};
