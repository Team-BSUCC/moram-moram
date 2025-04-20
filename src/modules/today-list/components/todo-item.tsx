import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Text from '@/components/commons/text';
import { useDeleteTodoMutation } from '@/modules/calendar/hooks/use-delete-todo-mutation';
import { changeDateSeparator } from '@/modules/calendar/utils/get-processed-date';
import { FlatTodo } from '../types/today-list-type';

type TodoItemProps = {
  todo: FlatTodo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodoData } = useDeleteTodoMutation();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTodoData(todo.todoId);
  };

  return (
    <div className='space-y-1'>
      <div className='flex w-full items-center justify-between border-b border-stroke px-1 py-2'>
        <Text size='20px-medium'>{todo.todoTitle}</Text>
        <Dropdown>
          <div>
            <Button variant='none' size='none' onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </Dropdown>
      </div>
      <div className='mt-1 pl-1'>
        <Text size='16px-medium' textColor='sub'>
          {changeDateSeparator(todo.scheduledDate)}
        </Text>
      </div>
    </div>
  );
};

export default TodoItem;
