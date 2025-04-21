import { TopicType } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import { useTopicCacheQuery } from '../hooks/use-mandalart-data-query';
import { RealtimeChannel } from '@supabase/supabase-js';
import Title from '@/components/commons/title';
import { rangeWithIndex } from '@/shared/utils/range-with-index';
import Spacer from '@/components/commons/spacer';

type TopicGroupProps = {
  topic: TopicType;
  channelReceiver: RealtimeChannel;
};

const TopicGroup = ({ topic, channelReceiver }: TopicGroupProps) => {
  const { data: topicName } = useTopicCacheQuery(topic.id);
  return (
    <div className='px-8'>
      <Title
        as='h3'
        size='18px-medium'
        textColor='sub'
        highlightColor={rangeWithIndex(topic.topic_index)}
      >
        {topicName}
      </Title>

      {topic.mandalart_subtopics?.map((sub) => (
        <SubtopicGroup
          key={sub.id}
          sub={sub}
          channelReceiver={channelReceiver}
        />
      ))}
      <Spacer size='lg' />
    </div>
  );
};

export default TopicGroup;
