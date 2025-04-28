'use client';

import { useDeleteTodoMutation } from '@/modules/calendar/hooks/use-delete-todo-mutation';
import { useUpdateTodoMutation } from '@/modules/calendar/hooks/use-update-todo-mutation';
import { useState } from 'react';
import CheckBox from './check-box';
import Text from './text';
import Dropdown from './drop-down';
import Button from './button';
import { FlatTodo } from '@/modules/today-list/types/today-list-type';
import { changeDateSeparator } from '@/modules/calendar/utils/get-processed-date';
import { motion } from 'framer-motion';

type TodoItemProps = {
  todo: FlatTodo;
  showDate?: boolean;
};

const TodoItem = ({ todo, showDate = false }: TodoItemProps) => {
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
    <div className='relative w-full'>
      <motion.div
        layout
        animate={{
          opacity: todo.isDone ? 0.7 : 1,
          filter: todo.isDone ? 'blur(0.5px)' : 'none',
        }}
        transition={{ duration: 0.2 }}
        className='w-full'
      >
        <div className='w-full'>
          <div className='flex w-full items-start justify-between'>
            <div className='flex w-full items-center gap-3'>
              <div className='py-2'>
                <CheckBox checked={checked} onChange={handleCheckToggle} />
              </div>
              <div className='flex w-full items-center justify-between border-b pb-[7px] pl-1 pt-2'>
                <Text
                  size='20px-medium'
                  line={checked ? 'cancelLine' : 'default'}
                >
                  {todo.todoTitle || '작성된 TODO 내용이 없습니다'}
                </Text>
              </div>
            </div>
          </div>
          <div className='ml-10 mt-[5px]'>
            <Text size='16px-medium' textColor='sub'>
              {showDate
                ? changeDateSeparator(todo.scheduledDate)
                : `${todo.topicTitle || ''} > ${todo.subtopicContent || ''}`}
            </Text>
          </div>
        </div>
      </motion.div>

      <div className='absolute right-0 top-3'>
        <Dropdown>
          <Button variant='none' size='none' onClick={handleDelete}>
            삭제하기
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default TodoItem;
