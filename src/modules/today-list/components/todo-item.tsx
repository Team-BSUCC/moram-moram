import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Text from '@/components/commons/text';
import { useDeleteTodoMutation } from '@/modules/calendar/hooks/use-delete-todo-mutation';
import { changeDateSeparator } from '@/modules/calendar/utils/get-processed-date';
import { FlatTodo } from '../types/today-list-type';
import { useState } from 'react';
import CheckBox from '@/components/commons/check-box';
import { useUpdateTodoMutation } from '@/modules/calendar/hooks/use-update-todo-mutation';

type TodoItemProps = {
  todo: FlatTodo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [checked, setChecked] = useState<boolean>(todo.isDone);
  const { mutate: updateTodoMutate } = useUpdateTodoMutation();
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTodoMutate(todo.todoId);
  };

  const handleCheckToggle = () => {
    updateTodoMutate(todo);
    setChecked(!checked);
  };

  return (
    <div className='w-full'>
      <div className='flex w-full items-start justify-between'>
        <div className='flex w-full items-center gap-3'>
          <div className='py-2'>
            <CheckBox checked={checked} onChange={handleCheckToggle} />
          </div>
          <div className='flex w-full items-center justify-between border-b pb-[7px] pl-1 pt-2'>
            <Text size='20px-medium' line={checked ? 'cancelLine' : 'default'}>
              {todo.todoTitle}
            </Text>
            <Dropdown>
              <Button variant='none' size='none' onClick={handleDelete}>
                삭제하기
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className='ml-10 mt-[5px]'>
        <Text size='16px-medium' textColor='sub'>
          {changeDateSeparator(todo.scheduledDate)}
        </Text>
      </div>
    </div>
  );
};

export default TodoItem;
