import TodoItem from './todo-item';
import { MandalartSubtopic } from '../types/realtime-type';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import { useClientStateStore } from '../hooks/use-client-state-store';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SubtopicGroupProps = {
  sub: MandalartSubtopic;
};

const SubtopicGroup = ({ sub }: SubtopicGroupProps) => {
  const todos = useClientStateStore((state) => state.todos);
  const todosWithSubTopicId = Array.from(todos)
    .filter(([_, value]) => value.cellId === sub.id)
    .map(([_, value]) => value);

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <div className='px-6'>
        <Spacer size='xs' />
        <div className='flex place-items-center gap-[8px]'>
          <Title as='h3' size='18px-medium' highlightColor={8} textColor='sub'>
            {sub.content}
          </Title>
          <button
            className={`transition-all ${toggle ? 'rotate-180' : 'rotate-0'}`}
            onClick={() => setToggle((prev) => !prev)}
          >
            <ChevronDown size={24} />
          </button>
        </div>
        <div className={toggle ? 'hidden' : 'block'}>
          {todosWithSubTopicId.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SubtopicGroup;
