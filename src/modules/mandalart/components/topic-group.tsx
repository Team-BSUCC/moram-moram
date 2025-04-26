import { MandalartTopic } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import Title from '@/components/commons/title';
import { rangeWithIndex } from '@/shared/utils/range-with-index';
import Spacer from '@/components/commons/spacer';
import { useClientStateStore } from '../hooks/use-client-state-store';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type TopicGroupProps = {
  topic: MandalartTopic;
};

const TopicGroup = ({ topic }: TopicGroupProps) => {
  const subTopics = useClientStateStore((state) => state.subTopics);

  const [toggle, setToggle] = useState<boolean>(true);

  const subTopicsWithTopicId = Array.from(subTopics)
    .filter(([_, value]) => value.topicId === topic.id && value.content)
    .map(([_, value]) => value);

  return (
    <div className='px-8'>
      <div className='flex place-items-center gap-[8px]'>
        <Title
          as='h3'
          size='18px-medium'
          textColor='sub'
          highlightColor={rangeWithIndex(topic.topicIndex)}
        >
          {topic.topic}
        </Title>
        <button
          className={`transition-all ${toggle ? 'rotate-180' : 'rotate-0'}`}
          onClick={() => setToggle((prev) => !prev)}
        >
          <ChevronDown size={24} />
        </button>
      </div>
      <div className={toggle ? 'hidden' : 'block'}>
        {subTopicsWithTopicId.map((subtopic) => (
          <SubtopicGroup key={subtopic.id} sub={subtopic} />
        ))}
      </div>
      <Spacer size='lg' />
    </div>
  );
};

export default TopicGroup;
