'use server';

import { getServerClient } from '@/shared/utils/supabase/server-client';

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
    //센트리처리
    return false;
  }

  return data.passcode === passcode;
};
