import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { CoreType, EventType } from '../type/todo-type';

type CalendarFloatingSheetProps = {
  todos: CoreType[] | undefined;
  events: EventType[] | undefined;
};

const CalendarFloatingSheet = ({
  todos: data,
  events,
}: CalendarFloatingSheetProps) => {
  // 달력에서 선택한 날짜
  const info = useFloatingSheetStore((state) => state.info as string);
  // 클릭한 날짜에 해당하는 투두 목록을 가져오기 위한 필터링
  const isSatisfied =
    events &&
    events?.filter((event) => event.date.slice(0, 10) === info).length > 0;

  return (
    <FloatingSheet>
      <Text>{info}</Text>
      <Title as='h1'>TO DO LIST</Title>
      {isSatisfied && data ? (
        data.map((core) => (
          <div key={core.title}>
            <Title as='h2'>{core.title}</Title>
            {core.topics.map((topic, topicIdx) =>
              topic.subtopics.map((sub, subIdx) =>
                sub.todos
                  .filter((todo) => todo.createdAt.slice(0, 10) === info)
                  .map((todo, idx) => (
                    <div key={`${topicIdx}-${subIdx}-${idx}`}>
                      <div>{todo.title}</div>
                      <div className='text-gray-500 text-sm'>
                        {topic.title} &gt; {sub.title}
                      </div>
                    </div>
                  ))
              )
            )}
          </div>
        ))
      ) : (
        <div className='text-gray-400 mt-2'>할 일이 없습니다...</div>
      )}
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
