import { useMemo } from 'react';
import Cell from './cell';
import { MandalartType, TopicsType, TopicType } from '../types/realtime-type';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';

const MainBlock = () => {
  const c;

  return (
    <div className='col-start-2 row-start-2 grid h-full grid-cols-3 grid-rows-3 gap-2'>
      {memoizedCells.map((cell, idx) => {
        //중앙 블럭의 대주제 스타일
        let cellStyle =
          idx < 4 ? getColorWithNumber(idx) : getColorWithNumber(idx - 1);
        //코어주제 스타일
        if (idx === 4)
          cellStyle = 'bg-violet-pigment border-black border-[3px]';
        return (
          <Cell
            key={idx}
            info={cell}
            value={cell?.topic || cell?.title || ''}
            className={cellStyle}
          />
        );
      })}
    </div>
  );
};

export default MainBlock;
