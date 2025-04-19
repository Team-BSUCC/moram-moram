import CheckBox from '@/components/commons/check-box';
import { SubtopicType, TodoType, TopicType } from '../type/todo-type';
import { useState } from 'react';
import Dropdown from '@/components/commons/drop-down';
import { useUpdateTodoMutation } from '../hooks/use-update-todo-mutation';
import { useDeleteTodoMutation } from '../hooks/use-delete-todo-mutation';
import Text from '@/components/commons/text';
import Button from '@/components/commons/button';

type CalendarTodoItemProps = {
  todo: TodoType;
  topic: TopicType;
  sub: SubtopicType;
};

const CalendarTodoItem = ({ todo, topic, sub }: CalendarTodoItemProps) => {
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
    deleteTodoData(todo.id);
  };

  return (
    <div className='w-full'>
      <div className='flex w-full items-start justify-between'>
        <div className='flex w-full items-center gap-3'>
          <div className='py-2'>
            <CheckBox checked={checked} onChange={handleCheckToggle} />
          </div>
          <div className='flex w-full items-center justify-between border-b pb-[7px] pl-1 pt-2'>
            <div>
              <Text
                size='20px-medium'
                line={checked ? 'cancelLine' : 'default'}
              >
                {todo.title}
              </Text>
            </div>
            <Dropdown>
              <div>
                <Button variant='none' size='none' onClick={handleDelete}>
                  삭제하기
                </Button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className='mx-9'></div>
      <div className='ml-10 mt-[5px]'>
        <Text size='16px-medium' textColor='sub'>
          {topic.title} &gt; {sub.title}
        </Text>
      </div>
    </div>
  );
};

export default CalendarTodoItem;
