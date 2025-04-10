import CheckBox from '@/components/commons/check-box';
import { useTodoCacheQuery } from '../hooks/use-mandalart-data-query';

type Props = {
  id: string;
};

const TodoItem = ({ id }: Props) => {
  const { data: todo } = useTodoCacheQuery(id);
  return (
    <div className='flex items-center'>
      <CheckBox />
      <div className='ml-2'>{todo}</div>
    </div>
  );
};

export default TodoItem;
