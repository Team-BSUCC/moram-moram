'use server';

import { getServerClient } from '@/shared/utils/supabase/server-client';
import * as Sentry from '@sentry/nextjs';

export const fetchCreateParticipantsUser = async (
  roomId: string,
  userId: string
) => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('room_participants')
    .insert([{ room_id: roomId, user_id: userId, role: 'editor' }]);

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchCreateParticipantsUser');

      Sentry.captureException(
        new Error(`[fetchCreateParticipantsUser] ${error.message}`)
      );
    });
    return false;
  }

  return true;
};
