import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import { useClientStateStore } from '../hooks/use-client-state-store';
import TopicCell from './topic-cell';
import { MandalartTopic } from '../types/realtime-type';
import React from 'react';
import SubTopicCell from './sub-topic-cell';

type SubBlockProps = {
  topic: MandalartTopic;
  index: number;
};

/**
 * 중앙 블록을 제외한 서브 블록 컴포넌트
 * @param title - 중앙 셀 제목
 * @param topic - 대주제
 * @returns
 */
const SubBlock = ({ topic, index }: SubBlockProps) => {
  const subTopic = useClientStateStore((state) => state.subTopics);
  const getTopic = useClientStateStore((state) => state.getTopicItem(topic.id));
  const backColor = getColorWithNumber(index);

  const subTopicsWithTopicId = Array.from(subTopic)
    .filter(([key, value]) => value.topicId === topic.id)
    .map(([_, value]) => value);

  return (
    // 서브블럭 스타일 지정
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <TopicCell
        key={topic.id}
        value={getTopic}
        backColor={backColor}
        className='col-start-2 row-start-2 h-full rounded-lg border-[3px] border-main'
      />
      {subTopicsWithTopicId.map((subTopic, idx) => {
        return (
          <SubTopicCell key={subTopic.id} index={idx} subTopic={subTopic} />
        );
      })}
    </div>
  );
};

export default React.memo(SubBlock);
