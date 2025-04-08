'use client';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const MandalartPage = () => {
  const [data, setData] = useState<any>();
  const supabase = getBrowserClient();
  const queryClient = useQueryClient();
  useEffect(() => {
    const fetchData = async () => {
      const { data: cell, error } = await supabase
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

      const mandalartData = cell[0];

      setData(mandalartData);

      mandalartData.mandalart_topics.forEach((topic) => {
        queryClient.setQueryData(['topic', topic.id], topic.topic);

        topic.mandalart_subtopics.forEach((subtopic) => {
          queryClient.setQueryData(
            ['subtopics', subtopic.id],
            subtopic.content
          );
          subtopic.cell_todos.forEach((todo) => {
            queryClient.setQueryData(['todo', todo.id], todo.title);
          });
        });
      });
    };

    fetchData();
  }, []);

  return <div>page</div>;
};

export default MandalartPage;
