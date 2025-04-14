import { QueryClient } from '@tanstack/react-query';
import { MandalartType } from '../types/realtime-type';
import { QUERY_KEY } from '@/shared/constants/query-key';

export const createTodoListkey = (
  queryClient: QueryClient,
  dbTableJoinData: MandalartType | undefined
) => {
  if (!dbTableJoinData) return;

  return dbTableJoinData.mandalart_topics.map((topic) => {
    topic.mandalart_subtopics.map((subtopic) => {
      queryClient.setQueryData(
        QUERY_KEY.todolist(subtopic.id),
        subtopic.cell_todos
      );
    });
  });
};
