import { QUERY_KEY } from '@/shared/constants/query-key';
import TodoItem from './todo-item';
import { useQuery } from '@tanstack/react-query';
import { SubTopicType, TodoType } from '../types/realtime-type';

const SubtopicGroup = ({ sub }: { sub: SubTopicType }) => {
  const { data: subtopicName } = useQuery({
    queryKey: QUERY_KEY.subtopic(sub.id),
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });
  return (
    <div key={sub.id} className='pl-4'>
      <div>{subtopicName}</div>
      {sub.cell_todos?.map((todo: TodoType) => (
        <TodoItem key={todo.id} id={todo.id} />
      ))}
    </div>
  );
};

export default SubtopicGroup;
