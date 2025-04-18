import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

export const fetchUpdateRoomPassword = async (
  roomId: string,
  passcode: string
) => {
  const supabase = getBrowserClient();

  const { error } = await supabase
    .from('rooms')
    .update({ passcode })
    .eq('id', roomId);
  if (error) {
    //TODO 센트리처리
    throw error;
  }
};
