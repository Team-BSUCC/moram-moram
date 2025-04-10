'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

const MandalartPage = () => {
  // floating sheet가 열렸는지 닫혔는지 판별하는 변수
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  /**
   * Memo: 동적 값으로 수정 예정
   */
  const { data, isPending, isError } = useMandalartDataQuery(
    '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'
  );

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  return (
    <div className='grid w-fit grid-cols-3 grid-rows-3 gap-5 text-xs'>
      {/* 중앙 블록 */}
      <MainBlock topics={data.mandalart_topics} info={data} />
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
      {/* 플로팅 시트 */}
      {isVisible && <MandalartFloatingSheet />}
    </div>
  );
};

export default MandalartPage;
