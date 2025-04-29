import { useClientStateStore } from '../hooks/use-client-state-store';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import CoreCell from './core-cell';
import TopicCell from './topic-cell';
import React from 'react';
import { getColorWithIndexOrderPigment } from '@/shared/utils/get-color-with-index';

const MainBlock = () => {
  const topics = useClientStateStore((state) => state.topics);
  const subTopics = useClientStateStore((state) => state.subTopics);

  return (
    <div className='col-start-2 row-start-2 grid h-full grid-cols-3 grid-rows-3 gap-2'>
      <CoreCell />
      {Array.from(topics).map(([key, value], idx) => {
        const isTopicDone =
          Array.from(subTopics)
            .filter(([_, value]) => value.topicId === key && value.isDone)
            .map(([_, value]) => value).length === 8;

        const backColor = isTopicDone
          ? getColorWithIndexOrderPigment(idx)
          : getColorWithNumber(idx);

        return <TopicCell key={key} value={value} backColor={backColor} />;
      })}
    </div>
  );
};

export default React.memo(MainBlock);
