import React from 'react';
import Text from '@/components/commons/text';
import { MandalartTopic } from '../types/realtime-type';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';

type TopicCellProps = {
  value: MandalartTopic | null;
  backColor: string;
  className?: string;
};

const TopicCell = ({ value, backColor, className }: TopicCellProps) => {
  const show = useTodoFloatingSheetStore((state) => state.show);
  const setInfo = useTodoFloatingSheetStore((state) => state.setInfo);

  const handleClick = () => {
    setInfo(value);
    show();
  };

  return (
    <>
      {/* 셀의 스타일 지정 */}
      <div
        onClick={handleClick}
        className={`relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-[1px] border-assist p-2 hover:cursor-pointer ${backColor} ${className}`}
      >
        <Text
          align='center'
          weight='bold'
          size='16px-semibold'
          textColor='main'
        >
          {value?.topic}
        </Text>
      </div>
    </>
  );
};

export default React.memo(TopicCell);
