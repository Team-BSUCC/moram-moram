import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColorMutationParams } from '../types/dashboard-type';
import { errorAlert, successAlert } from '@/shared/utils/sweet-alert';
import * as Sentry from '@sentry/nextjs';

export const useUpdateRoomColor = () => {
  const queryclient = useQueryClient();
  const supabase = getBrowserClient();
  return useMutation({
    mutationFn: async (params: ColorMutationParams) => {
      const { error } = await supabase
        .from('mandalarts')
        .update({ color: params.colorId })
        .eq('id', params.mandalartId);

      if (error) {
        Sentry.withScope((scope) => {
          scope.setTag('page', 'dashboard page');
          scope.setTag('feature', 'useUpdateRoomColor');

          Sentry.captureException(
            new Error(`[useUpdateRoomColor] ${error.message}`)
          );
        });
        throw error;
      }
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
