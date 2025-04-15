import { useQuery } from '@tanstack/react-query';
import { getFetchCalendarData } from '../services/get-fetch-calendar-data';

export const useFetchCalendarQuery = () => {
  return useQuery({
    queryKey: ['my-mandalarts'],
    queryFn: async () => await getFetchCalendarData(),
  });
};
