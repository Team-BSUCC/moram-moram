'use client';

import { useState } from 'react';
import CheckBox from '@/components/commons/check-box';
import Text from '@/components/commons/text';
import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import { useUpdateTodoMutation } from '../hooks/use-update-todo-mutation';
import { useDeleteTodoMutation } from '../hooks/use-delete-todo-mutation';
import { FlatTodo } from '@/modules/today-list/types/today-list-type';

type CalendarTodoItemProps = {
  todo: FlatTodo;
};

const CalendarTodoItem = ({ todo }: CalendarTodoItemProps) => {
  const [checked, setChecked] = useState<boolean>(todo.isDone);
  const { mutate: updateTodoMutate } = useUpdateTodoMutation();
  const { mutate: deleteTodoData } = useDeleteTodoMutation();

  const handleCheckToggle = () => {
    updateTodoMutate(todo);
    setChecked(!checked);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTodoData(todo.todoId);
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
          {todo.topicTitle} &gt; {todo.subtopicContent}
        </Text>
      </div>
    </div>
  );
};

export default CalendarTodoItem;
