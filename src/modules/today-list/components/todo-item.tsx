import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Text from '@/components/commons/text';
import { useDeleteTodoMutation } from '@/modules/calendar/hooks/use-delete-todo-mutation';
import { TodoType } from '@/modules/calendar/type/todo-type';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodoData } = useDeleteTodoMutation();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTodoData(todo.id);
  };

  return (
    <div className='space-y-1'>
      <div className='flex w-full items-center justify-between border-b border-stroke px-1 py-2'>
        <Text size='20px-medium'>{todo.title}</Text>
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
          {todo.createdAt.slice(0, 10)}
        </Text>
      </div>
    </div>
  );
};

export default TodoItem;
