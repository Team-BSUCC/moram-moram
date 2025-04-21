import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColorMutationParams } from '../types/dashboard-type';

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
        alert(`삭제 실패, ${error.message}`);
        return false;
      }

      return true;
    },
    onSuccess: () => {
      alert('수정 되었습니다.');
      queryclient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
    },
    onError: (error) => {
      alert(`수정 과정에서 문제가 발생하였습니다., ${error}`);
    },
  });
};
