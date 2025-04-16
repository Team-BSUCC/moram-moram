import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { CoreType, EventType } from '../type/todo-type';
import CheckBox from '@/components/commons/check-box';
import Spacer from '@/components/commons/spacer';

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
      <div className='flex justify-start'>
        <Text>{info}</Text>
      </div>
      <Title as='h1'>TO DO LIST</Title>
      <Spacer size={'sm'} />
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
              <Title as='h2' highlightColor='bg-blue-500'>
                {core.title}
              </Title>
              {core.topics.map((topic) =>
                topic.subtopics.map((sub) =>
                  sub.todos
                    .filter((todo) => todo.createdAt.slice(0, 10) === info)
                    .map((todo, idx) => (
                      <div key={idx}>
                        <div className='flex gap-3'>
                          <CheckBox />
                          <div>{todo.title}</div>
                        </div>
                        <div className='text-gray-500 ml-9 text-sm'>
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
