import Text from '@/components/commons/text';
import { TopicType } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import { useTopicCacheQuery } from '../hooks/use-mandalart-data-query';
import { RealtimeChannel } from '@supabase/supabase-js';

type TopicGroupProps = {
  topic: TopicType;
  channelReceiver: RealtimeChannel;
};

const TopicGroup = ({ topic, channelReceiver }: TopicGroupProps) => {
  const { data: topicName } = useTopicCacheQuery(topic.id);
  return (
    <div className='pl-2'>
      <div className='text-blue-700'>{topicName}</div>
      <Text>소주제</Text>
      {topic.mandalart_subtopics?.map((sub) => (
        <SubtopicGroup
          key={sub.id}
          sub={sub}
          channelReceiver={channelReceiver}
        />
      ))}
    </div>
  );
};

export default TopicGroup;
