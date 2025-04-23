'use server';

import { getServerClient } from '@/shared/utils/supabase/server-client';
import * as Sentry from '@sentry/nextjs';

export const fetchCheckRoomPasscode = async (
  roomId: string,
  passcode: string
) => {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('rooms')
    .select('passcode')
    .eq('id', roomId)
    .single<{ passcode: string }>();
  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchCheckRoomPasscode');

      Sentry.captureException(
        new Error(`[fetchCheckRoomPasscode] ${error.message}`)
      );
    });
    return false;
  }

  return data.passcode === passcode;
};
