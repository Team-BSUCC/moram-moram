import CheckBox from '@/components/commons/check-box';
import { SubtopicType, TodoType, TopicType } from '../type/todo-type';
import { useState } from 'react';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

type CalendarTodoItemProps = {
  todo: TodoType;
  topic: TopicType;
  sub: SubtopicType;
};

const CalendarTodoItem = ({ todo, topic, sub }: CalendarTodoItemProps) => {
  const [checked, setChecked] = useState<boolean>(todo.isDone);
  const supabase = getBrowserClient();
  const handleClick = () => {
    const toggleButton = async () => {
      const { data, error } = await supabase
        .from('cell_todos')
        .update({ is_done: !checked })
        .eq('id', todo.id);
    };
    toggleButton();
    setChecked(!checked);
  };

  return (
    <div>
      <div className='flex items-start justify-between'>
        <div className='flex gap-3'>
          <CheckBox checked={checked} onChange={handleClick} />
          <div className='font-medium'>{todo.title}</div>
        </div>
        <button
          className='text-gray-500 px-2 text-xl leading-none'
          onClick={async () => {
            await supabase.from('cell_todos').delete().eq('id', todo.id);
          }}
        >
          ⋮
        </button>
      </div>
      <div className='border-gray-200 mx-9 my-1 border-b'></div>
      <div className='text-gray-500 ml-9 mt-1 text-sm'>
        {topic.title} &gt; {sub.title}
      </div>
    </div>
  );
};

export default CalendarTodoItem;
