import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPostAiUsageCount } from '../services/fetch-post-ai-usage-count';

export const useUsageCountMutations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      fetchPostAiUsageCount(
        queryClient.getQueryData(['AI_USAGE_COUNT']) as number
      );
      queryClient.invalidateQueries({ queryKey: ['AI_USAGE_COUNT'] });
    },

    onError: (error) => {},
  });
};
