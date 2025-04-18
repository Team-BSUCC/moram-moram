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
    <div>
      <div className='flex items-start justify-between'>
        <div className='flex gap-3'>
          <CheckBox checked={checked} onChange={handleCheckToggle} />
          <Text size='20px-medium' line={checked ? 'cancelLine' : 'default'}>
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
      <div className='border-gray-200 mx-9 my-1 border-b'></div>
      <div className='ml-9 mt-1'>
        <Text size='16px-medium' textColor='sub'>
          {topic.title} &gt; {sub.title}
        </Text>
      </div>
    </div>
  );
};

export default CalendarTodoItem;
