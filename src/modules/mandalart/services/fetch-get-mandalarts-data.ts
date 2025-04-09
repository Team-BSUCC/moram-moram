import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { MandalartType } from '../types/realtime-type';
import { PostgrestError } from '@supabase/supabase-js';

export const fetchGetMandalartsData = async (
  id: string
): Promise<MandalartType | PostgrestError> => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase
    .from('mandalarts')
    .select(
      `
      id,
      room_id,
      title,
      created_at,
      private,
      mandalart_topics (
        id, mandalart_id, topic, created_at, topic_index,
        mandalart_subtopics (
          id, topic_id, content, is_done, created_at, cell_index,
          cell_todos (
            id, cell_id, created_at, is_done, title
          )))
    `
    )
    .eq('id', id);

  if (error) {
    console.error(error);
    throw error;
  }

  return data[0];
};
