import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { CoreType, EventType } from '../type/todo-type';
import Spacer from '@/components/commons/spacer';
import { getProcessedDate } from '../utils/get-processed-date';
import CalendarTodoItem from './calendar-todo-item';

type CalendarFloatingSheetProps = {
  todos: CoreType[] | undefined;
  events: EventType[] | undefined;
};

/**
 * 달력에서 선택한 날짜에 해당하는 투두 목록을 보여주는 플로팅 시트
 * @param todos - 플로팅 시트에 표시할 투두 목록
 * @param events - 달력에 표시된 이벤트 목록
 * @returns
 */
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
      <div className='handle h-[500px] w-[400px] p-5'>
        <div className='flex justify-start'>
          <Text size='18px-semibold' textColor='sub'>
            {getProcessedDate(info)}
          </Text>
        </div>
        <Title as='h1' size='28px-semibold'>
          TO DO LIST
        </Title>
        <Spacer size={'md'} />
        <hr className='mb-6' />
        {isSatisfied && data ? (
          data
            .filter((core) =>
              core.topics.some((topic) =>
                topic.subtopics.some((sub) =>
                  sub.todos.some((todo) => todo.scheduledDate === info)
                )
              )
            )
            .map((core) => (
              <div key={core.title} className='mb-5 flex flex-col gap-2'>
                {/* 하이라이트 컬러 DB에서 받아와서 수정 예정 */}
                <Title
                  as='h2'
                  highlightColor={0}
                  textColor='sub'
                  size='18px-semibold'
                >
                  {core.title}
                </Title>
                {core.topics.map((topic) =>
                  topic.subtopics.map((sub) =>
                    sub.todos
                      .filter((todo) => todo.scheduledDate === info)
                      .map((todo, idx) => (
                        <CalendarTodoItem
                          key={idx}
                          todo={todo}
                          sub={sub}
                          topic={topic}
                        />
                      ))
                  )
                )}
              </div>
            ))
        ) : (
          <div className='h- flex flex-col items-center justify-center'>
            <Spacer size='4xl' />
            <Text size='16px-regular' textColor='caption'>
              오늘은 여유로운 하루네요.
            </Text>
          </div>
        )}
      </div>
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
