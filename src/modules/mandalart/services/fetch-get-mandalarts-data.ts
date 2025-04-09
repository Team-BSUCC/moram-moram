import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

export const fetchGetMandalartsData = async () => {
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
    .eq('id', '6424de9b-7fbf-470a-9743-c9bb5e3cdad8');

  if (error) {
    console.error(error);
    return;
  }
  return data[0];
};
