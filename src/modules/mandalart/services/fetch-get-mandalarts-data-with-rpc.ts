'use server';
import { MandalartAllJson } from '../types/realtime-type';
import { getServerClient } from '@/shared/utils/supabase/server-client';

export const fetchGetMandalartsDataWithRpc = async (
  mandalartId: string
): Promise<MandalartAllJson> => {
  const supabase = getServerClient();
  const { data } = await supabase.rpc('get_mandalart_all_json', {
    _mandalart_id: mandalartId,
  });

  return data;
};
