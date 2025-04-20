'use client';

import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { FlatTodo } from '@/modules/today-list/types/today-list-type';
import Spacer from '@/components/commons/spacer';
import { getProcessedDate } from '../utils/get-processed-date';
import CalendarTodoItem from './calendar-todo-item';
import { X } from 'lucide-react';
import { groupBy } from '@/modules/today-list/utils/group-by';
import { rangeWithIndex } from '@/shared/utils/range-with-index';
import { matchWithCommonColor } from '../utils/match-with-common-color';

type CalendarFloatingSheetProps = {
  todos: FlatTodo[];
};

/**
 * 캘린더 플로팅 시트 컴포넌트
 * @param todos - todo 목록
 * @returns - 캘린더 플로팅 시트
 */
const CalendarFloatingSheet = ({ todos }: CalendarFloatingSheetProps) => {
  const info = useFloatingSheetStore((state) => state.info) as string;
  const hide = useFloatingSheetStore((state) => state.hide);

  // 1. 날짜 기준 필터링
  const filteredTodos = todos.filter((todo) => todo.scheduledDate === info);

  // 2. mandalartId 기준으로 그룹핑
  const groupedByMandalart = groupBy(filteredTodos, 'mandalartId');

  // 3. 각 mandalart 그룹 내부에서만 isDone 기준으로 정렬
  const sortedGroups = Object.entries(groupedByMandalart).map(
    ([mandalartId, group]) => ({
      mandalartId,
      todos: [...group].sort((a, b) => Number(a.isDone) - Number(b.isDone)),
    })
  );

  return (
    <FloatingSheet>
      <div className='handle cursor-grab px-5 active:cursor-grabbing'>
        <div className='fixed right-4 top-4 w-fit' onClick={hide}>
          <button className='bg-transparent'>
            <X />
          </button>
        </div>
        <Spacer size='lg' />
        <div className='flex justify-start'>
          <Text size='18px-semibold' textColor='sub'>
            {getProcessedDate(info)}
          </Text>
        </div>
        <Title as='h1' size='28px-semibold'>
          TO DO LIST
        </Title>
        <Spacer size={'xl'} />
      </div>
      <hr className='mb-6' />

      {/* 선택된 날짜에 해당하는 todo가 있을 경우 */}
      {filteredTodos.length > 0 ? (
        <div className='flex flex-col gap-6 px-5'>
          {/* mandalartId 기준으로 그룹핑된 todo 출력 */}
          {sortedGroups.map(({ mandalartId, todos }) => (
            <div key={mandalartId} className='flex flex-col gap-3'>
              {/* mandalart 제목 출력 */}
              <Title
                as='h2'
                size='18px-semibold'
                textColor='sub'
                highlightColor={rangeWithIndex(
                  matchWithCommonColor(todos[0].color as number)
                )}
              >
                {todos[0].mandalartTitle}
              </Title>

              {/* 각 mandalart에 해당하는 todo 출력 */}
              {todos.map((todo) => (
                <CalendarTodoItem key={todo.todoId} todo={todo} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        // 선택된 날짜에 해당하는 todo가 없을 경우
        <div className='flex flex-col items-center justify-center'>
          <Spacer size='4xl' />
          <Text size='16px-regular' textColor='caption'>
            오늘은 여유로운 하루네요.
          </Text>
        </div>
      )}
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
