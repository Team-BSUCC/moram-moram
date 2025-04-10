import CheckBox from '@/components/commons/check-box';
import { useQuery } from '@tanstack/react-query';

const TodoItem = ({ id }: { id: string }) => {
  const { data: todo } = useQuery({
    queryKey: ['TODO', id],
    queryFn: () => Promise.resolve(null),
    enabled: false,
  });

  return (
    <div className='flex items-center'>
      <CheckBox />
      <div className='ml-2'>{todo}</div>
    </div>
  );
};

export default TodoItem;
