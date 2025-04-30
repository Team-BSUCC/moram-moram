import { MandalartSubtopic } from '../types/realtime-type';
import React from 'react';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

type SubTopicCellProps = {
  bgColor: string;
  subTopic: MandalartSubtopic;
};

/**
 * 셀 컴포넌트
 * @param - 해당 Cell의 인덱스
 * @param info - 셀에 대한 모든 DB 컬럼 정보
 * @returns
 */
const SubTopicCell = ({ bgColor, subTopic }: SubTopicCellProps) => {
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  // 플로팅 시트를 띄우는 이벤트 핸들러
  const handleFloatingToggle = () => {
    setInfo(subTopic);
    show();
  };

  return (
    <div
      onClick={handleFloatingToggle}
      className={`${bgColor} relative flex aspect-square h-[88px] w-[88px] max-w-full items-center justify-center overflow-hidden rounded-lg border-[1px] border-assist p-2 hover:cursor-pointer`}
    >
      <Text align='center' size='16px-regular' textColor='main'>
        {subTopic?.content}
      </Text>
    </div>
  );
};

export default React.memo(SubTopicCell);
