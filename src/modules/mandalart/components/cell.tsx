import Button from '@/components/commons/button';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import React from 'react';

type Props = {
  value: string;
  className?: string;
  id?: any;
};

const Cell = ({ value, className, id }: Props) => {
  const setShowId = useFloatingSheetStore((state) => state.setShowId);

  const handleClick = () => {
    setShowId(id);
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
