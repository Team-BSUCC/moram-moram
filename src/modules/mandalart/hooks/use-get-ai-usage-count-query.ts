import { useQuery } from '@tanstack/react-query';
import { fetchGetAiUsageCount } from '../services/fetch-get-ai-usage-count';
import { useEffect, useState } from 'react';

export const useGetAiUsageCountQuery = () => {
  const {
    data,
    isPending,
    error,
    isFetching: isAiUsageCountFetching,
  } = useQuery({
    queryKey: ['AI_USAGE_COUNT'],
    queryFn: () => fetchGetAiUsageCount(),
  });

  const [aiUsageCount, setAiUsageCount] = useState<number | null>(null);
  useEffect(() => {
    if (error) {
      setAiUsageCount(null);
    }
    setAiUsageCount(data as number);
  }, [isPending, error, data]);

  return { aiUsageCount, isAiUsageCountFetching };
};
