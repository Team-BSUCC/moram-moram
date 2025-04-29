'use server';

import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import * as Sentry from '@sentry/nextjs';
export const fetchGetAiUsageCount = async (): Promise<number | null> => {
  const user = await getUserInfo();
  if (user === null) return null;

  const userId = user.id;

  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('users')
    .select('daily_ai_usage_count')
    .eq('id', userId)
    .single();

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchGetAiUsageCount');

      Sentry.captureException(
        new Error(`[fetchGetAiUsageCount] ${error.message}`)
      );
    });
    return null;
  }

  return data.daily_ai_usage_count;
};
