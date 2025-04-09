'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

const MandalartPage = () => {
  const showInfo = useFloatingSheetStore((state) => state.showInfo);
  const { data, isPending, isError } = useMandalartDataQuery(
    '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'
  );

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>error</div>;
  return (
    <div className='grid w-fit grid-cols-3 grid-rows-3 gap-5 text-xs'>
      {/* 중앙 블록 */}
      <MainBlock
        title={data.title}
        topics={data.mandalart_topics}
        info={data}
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
      {showInfo && <MandalartFloatingSheet />}
    </div>
  );
};

export default MandalartPage;
