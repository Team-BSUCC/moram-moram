import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

type CalendarProps = {
  todos: any;
  events: any;
};

const CalendarFloatingSheet = ({ todos: data, events }: CalendarProps) => {
  const info = useFloatingSheetStore((state) => state.info as string);
  const isSatisfied =
    events.filter((event) => event.date.slice(0, 10) === info).length > 0;

  return (
    <FloatingSheet>
      <Text>{info}</Text>
      <Title as='h1'>TO DO LIST</Title>

      {isSatisfied ? (
        data.map((core) => (
          <div key={core.title}>
            <Title as='h2'>{core.title}</Title> {/* 핵심주제 */}
            {core.topics.map((topic) =>
              topic.subtopics.map((sub) =>
                sub.todos
                  .filter((todo) => todo.createdAt.slice(0, 10) === info)
                  .map((todo, idx) => (
                    <div key={idx}>
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
