import TodoItem from './todo-item';
import { SubTopicType, TodoType } from '../types/realtime-type';
import { useSubtopicCacheQuery } from '../hooks/use-mandalart-data-query';

type SubtopicGroupProps = {
  sub: SubTopicType;
};

const SubtopicGroup = ({ sub }: SubtopicGroupProps) => {
  const { data: subtopicName } = useSubtopicCacheQuery(sub.id);
  return (
    <div className='pl-4'>
      <div>{subtopicName}</div>
      {sub.cell_todos?.map((todo: TodoType) => (
        <TodoItem key={todo.id} id={todo.id} />
      ))}
    </div>
  );
};

export default SubtopicGroup;
