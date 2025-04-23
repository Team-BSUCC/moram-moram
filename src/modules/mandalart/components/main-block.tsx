import { useClientStateStore } from '../hooks/use-client-state-store';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import CoreCell from './core-cell';
import TopicCell from './topic-cell';
import React from 'react';

const MainBlock = () => {
  const topics = useClientStateStore((state) => state.topics);

  return (
    <div className='col-start-2 row-start-2 grid h-full grid-cols-3 grid-rows-3 gap-2'>
      <CoreCell />
      {Array.from(topics).map(([key, value], idx) => {
        const backColor = getColorWithNumber(idx);
        return <TopicCell key={key} value={value} backColor={backColor} />;
      })}
    </div>
  );
};

export default React.memo(MainBlock);
