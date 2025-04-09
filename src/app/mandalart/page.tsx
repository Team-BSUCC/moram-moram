'use client';
import MainBlock from '@/modules/mandalart/components/main-block';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
// '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'

const MandalartPage = () => {
  const { data, isLoading, isError } = useMandalartDataQuery(
    '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

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
