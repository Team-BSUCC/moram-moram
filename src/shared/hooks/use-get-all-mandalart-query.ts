import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { getBrowserClient } from '../utils/supabase/browser-client';
import { MyMandalartsType } from '@/modules/today-list/types/today-list-type';
import * as Sentry from '@sentry/nextjs';

export const useGetAllMandalartQuery = ({ user }: { user: User | null }) => {
  const supabase = getBrowserClient();

  return useQuery<MyMandalartsType>({
    queryKey: ['myMandalarts'],
    queryFn: async () => {
      if (!user) throw new Error('User is not authenticated');

      const { data, error } = await supabase.rpc('get_all_mandalarts_by_user', {
        _user_id: user.id,
      });

      if (error) {
        Sentry.withScope((scope) => {
          scope.setTag('page', 'Today-list Page');
          scope.setTag('feature', 'get_all_mandalarts_by_user');

          Sentry.captureException(
            new Error(`[Today-list Page] ${error.message}`)
          );
        });
      }

      return data;
    },
    enabled: !!user,
  });
};
