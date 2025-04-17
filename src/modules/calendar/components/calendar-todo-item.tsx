import CheckBox from '@/components/commons/check-box';
import { SubtopicType, TodoType, TopicType } from '../type/todo-type';

type CalendarTodoItemProps = {
  todo: TodoType;
  topic: TopicType;
  sub: SubtopicType;
};

const CalendarTodoItem = ({ todo, topic, sub }: CalendarTodoItemProps) => {
  return (
    <div>
      <div className='flex items-start justify-between'>
        <div className='flex gap-3'>
          <CheckBox />
          <div className='font-medium'>{todo.title}</div>
        </div>
        <button className='text-gray-500 px-2 text-xl leading-none'>⋮</button>
      </div>
      <div className='border-gray-200 mx-9 my-1 border-b'></div>
      <div className='text-gray-500 ml-9 mt-1 text-sm'>
        {topic.title} &gt; {sub.title}
      </div>
    </div>
  );
};

export default CalendarTodoItem;
