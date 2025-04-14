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

type SubtopicGroupProps = {
  sub: SubTopicType;
  channelReceiver: RealtimeChannel;
};

const SubtopicGroup = ({ sub, channelReceiver }: SubtopicGroupProps) => {
  const { data: subtopicName } = useSubtopicCacheQuery(sub.id);

  const { data: todoList } = useTodoListCacheQuery(sub.id);
  const todoListCacheArray = (todoList ?? []) as TodoPayloadType[];
  return (
    <div className='pl-4'>
      <div>{subtopicName}</div>
      {todoListCacheArray.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          cellId={todo}
          channelReceiver={channelReceiver}
        />
      ))}
    </div>
  );
};

export default SubtopicGroup;
