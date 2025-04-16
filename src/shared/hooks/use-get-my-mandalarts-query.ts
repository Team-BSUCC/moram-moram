import { useQuery } from '@tanstack/react-query';
import { ProcessedDataType } from '../../modules/calendar/type/fetch-calendar-type';

export const useGetMyMandalartsQuery = () => {
  return useQuery<ProcessedDataType>({
    queryKey: ['my-mandalarts'],
    queryFn: async () => {
      const res = await fetch('/api/my-mandalarts');
      if (!res.ok) throw new Error('Failed to fetch Mandalarts data');
      return res.json();
    },
  });
};
