import { MandalartSubtopic } from '../types/realtime-type';
import React from 'react';
import Text from '@/components/commons/text';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';

type SubTopicCellProps = {
  index: number;
  subTopic: MandalartSubtopic;
};

/**
 * 셀 컴포넌트
 * @param - 해당 Cell의 인덱스
 * @param info - 셀에 대한 모든 DB 컬럼 정보
 * @returns
 */
const SubTopicCell = ({ index, subTopic }: SubTopicCellProps) => {
  const show = useTodoFloatingSheetStore((state) => state.show);
  const setInfo = useTodoFloatingSheetStore((state) => state.setInfo);

  // 플로팅 시트를 띄우는 이벤트 핸들러
  const handleClick = () => {
    setInfo(subTopic);
    show();
  };

  return (
    <>
      {/* 셀의 스타일 지정 */}
      <div
        onClick={handleClick}
        className='relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-2 p-2 hover:cursor-pointer'
      >
        <Text align='center' size='16px-regular' textColor='main'>
          {subTopic?.content}
        </Text>
      </div>
    </>
  );
};

export default React.memo(SubTopicCell);
