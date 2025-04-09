import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchGetMandalartsData } from '../services/fetch-get-Mandalarts-data';
import { QUERY_KEY } from '@/shared/constants/query-key';

export const useMandalartDataQuery = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['mandalarts', id],
    queryFn: () => fetchGetMandalartsData(id),
    select: (data) => {
      data?.mandalart_topics.forEach((topic) => {
        queryClient.setQueryData(QUERY_KEY.topic(topic.id), topic.topic);

        topic.mandalart_subtopics.forEach((subtopic) => {
          queryClient.setQueryData(
            QUERY_KEY.subtopic(subtopic.id),
            subtopic.content
          );
          subtopic.cell_todos.forEach((todo) => {
            queryClient.setQueryData(QUERY_KEY.todo(todo.id), todo.title);
          });
        });
      });
      return data;
    },
  });
};
