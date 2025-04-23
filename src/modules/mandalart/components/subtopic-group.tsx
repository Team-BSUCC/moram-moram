import TodoItem from './todo-item';
import { MandalartSubtopic } from '../types/realtime-type';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import { useClientStateStore } from '../hooks/use-client-state-store';

type SubtopicGroupProps = {
  sub: MandalartSubtopic;
};

const SubtopicGroup = ({ sub }: SubtopicGroupProps) => {
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
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default SubtopicGroup;
