import Text from '@/components/commons/text';
import { TopicType } from '../types/realtime-type';
import SubtopicGroup from './subtopic-group';
import { useTopicCacheQuery } from '../hooks/use-mandalart-data-query';

type TopicGroupProps = {
  topic: TopicType;
};

const TopicGroup = ({ topic }: TopicGroupProps) => {
  const { data: topicName } = useTopicCacheQuery(topic.id);
  return (
    <div className='pl-2'>
      <div className='text-blue-700'>{topicName}</div>
      <Text>소주제</Text>
      {topic.mandalart_subtopics?.map((sub) => (
        <SubtopicGroup key={sub.id} sub={sub} />
      ))}
    </div>
  );
};

export default TopicGroup;
