import TodoItem from './todo-item';
import {
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

type SubtopicGroupProps = {
  sub: SubTopicType;
  channelReceiver: RealtimeChannel;
};

const SubtopicGroup = ({ sub, channelReceiver }: SubtopicGroupProps) => {
  const { data: subtopicName } = useSubtopicCacheQuery(sub.id);

  const { data: todoList } = useTodoListCacheQuery(sub.id);
  const todoListCacheArray = (todoList ?? []) as TodoPayloadType[];
  return (
    <>
      <div className='pl-4'>
        <Spacer size='xs' />
        <Title as='h3' size='18px-medium' highlightColor={8} textColor='sub'>
          {subtopicName}
        </Title>
      </div>
      {todoListCacheArray.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          cellId={todo}
          channelReceiver={channelReceiver}
        />
      ))}
    </>
  );
};

export default SubtopicGroup;
