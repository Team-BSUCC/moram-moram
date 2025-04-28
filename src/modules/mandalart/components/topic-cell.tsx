import React from 'react';
import Text from '@/components/commons/text';
import { MandalartTopic } from '../types/realtime-type';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

type TopicCellProps = {
  value: MandalartTopic | null;
  backColor: string;
  className?: string;
};

const TopicCell = ({ value, backColor, className }: TopicCellProps) => {
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const handleFloatingToggle = () => {
    setInfo(value);
    show();
  };

  return (
    <div
      onClick={handleFloatingToggle}
      className={`relative flex aspect-square h-[88px] w-[88px] max-w-full items-center justify-center overflow-hidden rounded-lg border-[1px] border-assist p-2 hover:cursor-pointer ${backColor} ${className}`}
    >
      <Text align='center' weight='bold' size='16px-semibold' textColor='main'>
        {value?.topic}
      </Text>
    </div>
  );
};

export default React.memo(TopicCell);
