import TodoItem from './todo-item';
import {
  MandalartSubtopic,
  SubTopicType,
  TodoPayloadType,
  TodoType,
} from '../types/realtime-type';
import {
  useSubtopicCacheQuery,
  useTodoListCacheQuery,
} from '../hooks/use-mandalart-data-query';
import { RealtimeChannel } from '@supabase/supabase-js';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import { useClientStateStore } from '../hooks/use-client-state-store';

type SubtopicGroupProps = {
  sub: MandalartSubtopic;
  channelReceiver: RealtimeChannel;
};

const SubtopicGroup = ({ sub, channelReceiver }: SubtopicGroupProps) => {
  const todos = useClientStateStore((state) => state.todos);
  const todosWithSubTopicId = Array.from(todos)
    .filter(([key, value]) => value.cellId === sub.id)
    .map(([_, value]) => value);

  return (
    <>
      <div className='pl-6'>
        <Spacer size='xs' />
        <Title as='h3' size='18px-medium' highlightColor={8} textColor='sub'>
          {sub.content}
        </Title>

        {todosWithSubTopicId.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            todo={todo}
            channelReceiver={channelReceiver}
          />
        ))}
      </div>
    </>
  );
};

export default SubtopicGroup;
