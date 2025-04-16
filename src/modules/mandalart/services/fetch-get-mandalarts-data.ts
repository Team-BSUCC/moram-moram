'use server';
import { MandalartType } from '../types/realtime-type';
import { PostgrestError } from '@supabase/supabase-js';
import { getServerClient } from '@/shared/utils/supabase/server-client';

/**
 * 만다라트 데이터를 불러오는 fetch 함수
 * @param id - 만다라트 id
 * @returns
 */
export const fetchGetMandalartsData = async (
  id: string
): Promise<MandalartType | PostgrestError> => {
  const supabase = getServerClient();
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
    throw error;
  }

  //만다라트 셀 정렬
  if (data && data[0] && data[0].mandalart_topics) {
    data[0].mandalart_topics.sort((a, b) => a.topic_index - b.topic_index);
    data[0].mandalart_topics.forEach((topic) => {
      if (topic.mandalart_subtopics) {
        topic.mandalart_subtopics.sort((a, b) => a.cell_index - b.cell_index);
      }
    });
  }

  return data[0];
};
