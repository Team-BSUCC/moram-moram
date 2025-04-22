import { MandalartTopic } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import { RealtimeChannel } from '@supabase/supabase-js';
import Title from '@/components/commons/title';
import { rangeWithIndex } from '@/shared/utils/range-with-index';
import Spacer from '@/components/commons/spacer';
import { useClientStateStore } from '../hooks/use-client-state-store';

type TopicGroupProps = {
  topic: MandalartTopic;
  channelReceiver: RealtimeChannel;
};

const TopicGroup = ({ topic, channelReceiver }: TopicGroupProps) => {
  const subTopics = useClientStateStore((state) => state.subTopics);

  const subTopicsWithTopicId = Array.from(subTopics)
    .filter(([key, value]) => value.topicId === topic.id)
    .map(([_, value]) => value);

  return (
    <div className='px-8'>
      <Title
        as='h3'
        size='18px-medium'
        textColor='sub'
        highlightColor={rangeWithIndex(topic.topicIndex)}
      >
        {topic.topic}
      </Title>

      {subTopicsWithTopicId.map((subtopic) => (
        <SubtopicGroup
          key={subtopic.id}
          sub={subtopic}
          channelReceiver={channelReceiver}
        />
      ))}
      <Spacer size='lg' />
    </div>
  );
};

export default TopicGroup;
