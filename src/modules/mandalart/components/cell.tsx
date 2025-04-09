import Button from '@/components/commons/button';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import React from 'react';
import { CellInfo } from '../types/realtime-type';
import { useCellDataQuery } from '../hooks/use-mandalart-data-query';

type Props = {
  value: string;
  className?: string;
  info: CellInfo;
};

const Cell = ({ value, className, info }: Props) => {
  useCellDataQuery(value, info);
  const setShowInfo = useFloatingSheetStore((state) => state.setShowInfo);

  const handleClick = () => {
    setShowInfo(info);
  };

  return (
    <Button onClick={handleClick}>
      <div
        className={`border-gray-200 flex h-20 w-20 items-center justify-center border text-center text-xs ${className || ''}`}
        style={{ borderRadius: '8px' }}
      >
        {value}
      </div>
    </Button>
  );
};

export default React.memo(Cell);
