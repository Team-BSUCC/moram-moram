import Text from '@/components/commons/text';
import { TopicType } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import { useTopicCacheQuery } from '../hooks/use-mandalart-data-query';
import { RealtimeChannel } from '@supabase/supabase-js';
import Title from '@/components/commons/title';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';

type TopicGroupProps = {
  topic: TopicType;
  channelReceiver: RealtimeChannel;
};

const TopicGroup = ({ topic, channelReceiver }: TopicGroupProps) => {
  const { data: topicName } = useTopicCacheQuery(topic.id);
  return (
    <div className='pl-2'>
      <div className='flex gap-2'>
        <div className={`${getColorWithNumber(topic.topic_index)} h-fll w-2`} />
        <Title as='h3'>{topicName}</Title>
      </div>
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
