import Text from '@/components/commons/text';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { TopicType } from '../types/realtime-type';
import { useQuery } from '@tanstack/react-query';
import SubtopicGroup from './subtopic-group';

const TopicGroup = ({ topic }: { topic: TopicType }) => {
  const { data: topicName } = useQuery({
    queryKey: QUERY_KEY.topic(topic.id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
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
