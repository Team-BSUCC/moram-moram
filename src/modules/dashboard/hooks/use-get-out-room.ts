import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { errorAlert, successAlert } from '@/shared/utils/sweet-alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Sentry from '@sentry/nextjs';

type GetOutRoomRequestParams = {
  roomId: string;
  userId: string;
};

export const useGetOutRoom = () => {
  const queryclient = useQueryClient();
  const supabase = getBrowserClient();
  return useMutation({
    mutationFn: async (params: GetOutRoomRequestParams) => {
      const { error } = await supabase
        .from('room_participants')
        .delete()
        .match({
          room_id: params.roomId,
          user_id: params.userId,
        });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      successAlert('삭제 되었습니다.');
      queryclient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'dashboard page');
        scope.setTag('feature', 'useGetOutRoom');

        Sentry.captureException(new Error(`[useGetOutRoom] ${error.message}`));
      });
      errorAlert(`퇴장 과정에서 문제가 발생하였습니다., ${error.message}`);
    },
  });
};
