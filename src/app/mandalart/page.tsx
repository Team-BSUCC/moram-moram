'use client';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/query-key';
import MainBlock from '@/modules/mandalart/components/main-block';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { fetchGetMandalartsData } from '@/modules/mandalart/services/fetch-get-Mandalarts-data';

const MandalartPage = () => {
  const [data, setData] = useState<any>();
  const queryClient = useQueryClient();
  useEffect(() => {
    const fetchData = async () => {
      const mandalartData = await fetchGetMandalartsData();
      setData(mandalartData);

      mandalartData?.mandalart_topics.forEach((topic) => {
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
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className='grid w-fit grid-cols-3 grid-rows-3 gap-5 text-xs'>
      {/* 중앙 블록 */}
      <MainBlock
        title={data.title}
        topics={data.mandalart_topics}
        id={data.id}
        className='col-start-2 row-start-2 h-full'
      />
      {/* 나머지 블록 */}
      {data.mandalart_topics.map((topic) => {
        return (
          <SubBlock
            key={topic.id}
            title={topic.topic}
            topic={topic}
            subTopics={topic.mandalart_subtopics}
          />
        );
      })}
    </div>
  );
};

export default MandalartPage;
