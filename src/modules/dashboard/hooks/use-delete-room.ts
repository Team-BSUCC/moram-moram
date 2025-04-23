import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { errorAlert, successAlert } from '@/shared/utils/sweet-alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRoom = () => {
  const queryclient = useQueryClient();
  const supabase = getBrowserClient();
  return useMutation({
    mutationFn: async (roomId: string) => {
      const { error } = await supabase.from('rooms').delete().eq('id', roomId);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      successAlert('삭제 되었습니다.');
      queryclient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
    },
    onError: (error) => {
      errorAlert(`삭제 과정에서 문제가 발생하였습니다., ${error.message}`);
    },
  });
};
