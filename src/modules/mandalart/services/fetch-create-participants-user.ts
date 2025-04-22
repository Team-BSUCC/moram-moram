'use server';

import { getServerClient } from '@/shared/utils/supabase/server-client';

export const fetchCreateParticipantsUser = async (
  roomId: string,
  userId: string
) => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('room_participants')
    .insert([{ room_id: roomId, user_id: userId, role: 'editor' }]);

  if (error) {
    //센트리처리
    return false;
  }

  return true;
};
