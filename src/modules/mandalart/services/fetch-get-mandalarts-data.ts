'use server';

import { MandalartAllJson } from '../types/realtime-type';
import { getServerClient } from '@/shared/utils/supabase/server-client';

/**
 * 만다라트 데이터를 불러오는 fetch 함수
 * @param id - 만다라트 id
 * @returns
 */

export const getMandalartWithRPC = async (
  id: string
): Promise<MandalartAllJson> => {
  const supabase = getServerClient();
  const { data: mandalart } = await supabase.rpc('get_mandalart_all_json', {
    _mandalart_id: id,
  });

  const sortedTopics = [...mandalart.topics].sort(
    (a, b) => a.topicIndex - b.topicIndex
  );
  const sortedSubtopics = [...mandalart.subtopics].sort(
    (a, b) => a.cellIndex - b.cellIndex
  );
  const sortedData = {
    ...mandalart,
    topics: sortedTopics,
    subtopics: sortedSubtopics,
  };

  return sortedData;
};
