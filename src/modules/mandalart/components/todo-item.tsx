import CheckBox from '@/components/commons/check-box';
import { useTodoCacheQuery } from '../hooks/use-mandalart-data-query';

type TodoItemProps = {
  id: string;
};

const TodoItem = ({ id }: TodoItemProps) => {
  const { data: todo } = useTodoCacheQuery(id);
  return (
    <div className='flex items-center'>
      <CheckBox />
      <div className='ml-2'>{todo}</div>
    </div>
  );
};

export default TodoItem;
