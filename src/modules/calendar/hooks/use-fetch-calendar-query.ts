import { useQuery } from '@tanstack/react-query';
import { getAllMandalartData } from '../../../shared/api/get-all-mandalart-data';

export const useFetchCalendarQuery = () => {
  return useQuery({
    queryKey: ['my-mandalarts'],
    queryFn: async () => await getAllMandalartData(),
  });
};
