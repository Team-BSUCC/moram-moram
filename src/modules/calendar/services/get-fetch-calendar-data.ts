import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

export const getFetchCalendarData = async () => {
  const supabase = getBrowserClient();
  const { data, error }: { data: any; error: any } = await supabase
    .from('room_participants')
    .select(
      `role,
          rooms (id, 
          mandalarts (id, title, created_at, private,
          mandalart_topics (id, topic, topic_index, created_at,
          mandalart_subtopics (id, content, cell_index, is_done, created_at,
          cell_todos (id, title, is_done, created_at)))))`
    )
    .eq('user_id', 'd2477fa0-d848-47df-a962-fdf0d46735c0');

  if (error) throw new Error(error.message);
  if (!data || !Array.isArray(data)) return;
  const parsed: {
    title: string;
    topics: {
      title: string;
      subtopics: {
        title: string;
        isDone: boolean;
        todos: { title: string; isDone: boolean; createdAt: string }[];
      }[];
    }[];
  }[] = [];

  data.forEach((participant) => {
    participant.rooms?.mandalarts?.forEach((mandalart) => {
      const core = {
        title: mandalart.title,
        topics: [],
      };

      mandalart.mandalart_topics?.forEach((topic) => {
        const topicGroup = {
          title: topic.topic,
          subtopics: [],
        };

        topic.mandalart_subtopics?.forEach((sub) => {
          const subtopic = {
            title: sub.content,
            isDone: sub.is_done,
            todos:
              sub.cell_todos?.map((todo) => ({
                title: todo.title,
                isDone: todo.is_done,
                createdAt: todo.created_at,
              })) ?? [],
          };

          (topicGroup.subtopics as any[]).push(subtopic);
        });

        (core.topics as any[]).push(topicGroup);
      });

      parsed.push(core);
    });
  });
  return parsed;
};
