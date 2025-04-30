'use server';

import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import * as Sentry from '@sentry/nextjs';
export const fetchPostAiUsageCount = async (count: number) => {
  const user = await getUserInfo();
  if (user === null) return null;
  const userId = user.id;

  const supabase = getServerClient();

  const { error } = await supabase
    .from('users')
    .update({ daily_ai_usage_count: count + 1 })
    .eq('id', userId);

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchCreateParticipantsUser');

      Sentry.captureException(
        new Error(`[fetchCreateParticipantsUser] ${error.message}`)
      );
    });
  }
};
