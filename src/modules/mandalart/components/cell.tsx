import Button from '@/components/commons/button';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useCellDataQuery } from '../hooks/use-mandalart-data-query';
import RegisterTodo from './register-todo';
import { ExtendedCellInfo } from '../types/realtime-type';
import React from 'react';

type Props = {
  value: string;
  className?: string;
  info: ExtendedCellInfo;
};

const Cell = ({ value, className, info }: Props) => {
  useCellDataQuery(value, info);
  const setShowInfo = useFloatingSheetStore((state) => state.setShowInfo);

  const handleClick = () => {
    setShowInfo(info);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <div
          className={`border-gray-200 flex h-20 w-20 items-center justify-center border text-center text-xs ${className || ''}`}
          style={{ borderRadius: '8px' }}
        >
          {value}
        </div>
      </Button>
      {info.cell_todos?.map((todo, idx) => {
        return <RegisterTodo key={idx} todo={todo} />;
      })}
    </>
  );
};

export default React.memo(Cell);
