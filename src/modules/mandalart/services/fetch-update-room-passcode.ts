import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import * as Sentry from '@sentry/nextjs';

export const fetchUpdateRoomPasscode = async (
  roomId: string,
  passcode: string
) => {
  const supabase = getBrowserClient();

  const { error } = await supabase
    .from('rooms')
    .update({ passcode })
    .eq('id', roomId);
  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchUpdateRoomPasscode');
      Sentry.captureException(
        new Error(`[fetchUpdateRoomPasscode] ${error.message}`)
      );
    });
    throw error;
  }
};
