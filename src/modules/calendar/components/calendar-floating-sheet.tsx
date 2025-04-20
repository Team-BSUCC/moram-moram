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

type CalendarFloatingSheetProps = {
  todos: FlatTodo[];
};

const CalendarFloatingSheet = ({ todos }: CalendarFloatingSheetProps) => {
  const info = useFloatingSheetStore((state) => state.info) as string;
  const hide = useFloatingSheetStore((state) => state.hide);

  // 날짜 기준 필터링된 todo들
  const filteredTodos = todos
    .filter((todo) => todo.scheduledDate === info)
    .sort((a, b) => Number(a.isDone) - Number(b.isDone));

  // mandalartId 기준으로 그룹핑
  const groupedByMandalart = groupBy(filteredTodos, 'mandalartId');

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

      {filteredTodos.length > 0 ? (
        <div className='flex flex-col gap-6 px-5'>
          {Object.entries(groupedByMandalart).map(([mandalartId, group]) => (
            <div key={mandalartId} className='flex flex-col gap-3'>
              <Title
                as='h2'
                size='18px-semibold'
                textColor='sub'
                highlightColor={0}
              >
                {group[0].mandalartTitle}
              </Title>
              {group.map((todo) => (
                <CalendarTodoItem key={todo.todoId} todo={todo} />
              ))}
            </div>
          ))}
        </div>
      ) : (
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
