import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { CoreType, EventType } from '../type/todo-type';
import Spacer from '@/components/commons/spacer';
import { getProcessedDate } from '../services/get-processed-date';
import CalendarTodoItem from './calendar-todo-item';

type CalendarFloatingSheetProps = {
  todos: CoreType[] | undefined;
  events: EventType[] | undefined;
};

/**
 * @todo: 체크박스 클릭한게 DB에 반영되게 수정
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
      <div className='h-[500px] w-[400px] p-5'>
        <div className='flex justify-start'>
          {/* 폰트 크기, 볼드 수정 */}
          <Text>{getProcessedDate(info)}</Text>
        </div>
        {/* 텍스트 볼드체로 변경하기 */}
        <Title as='h1'>TO DO LIST</Title>
        <Spacer size={'md'} />
        <hr className='mb-5' />
        {isSatisfied && data ? (
          data
            .filter((core) =>
              core.topics.some((topic) =>
                topic.subtopics.some((sub) =>
                  sub.todos.some((todo) => todo.createdAt.slice(0, 10) === info)
                )
              )
            )
            .map((core) => (
              <div key={core.title} className='flex flex-col gap-5'>
                {/* 하이라이트 색상 수정 및 폰트 크기 수정 */}
                <Title as='h2' highlightColor='bg-blue-500'>
                  {core.title}
                </Title>
                {core.topics.map((topic) =>
                  topic.subtopics.map((sub) =>
                    sub.todos
                      .filter((todo) => todo.createdAt.slice(0, 10) === info)
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
            <Spacer size={'lg'} />
            <div className='mt-2 font-[16px] text-[#A6A6A6]'>
              오늘은 여유로운 하루네요.
            </div>
          </div>
        )}
      </div>
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
