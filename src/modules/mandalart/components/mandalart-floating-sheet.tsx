import Button from '@/components/commons/button';
import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useState } from 'react';
import {
  CellInfoType,
  TodoPayloadType,
  TodoType,
} from '../types/realtime-type';
import TodoItem from './todo-item';
import { getDataCategory } from '../services/get-data-category';
import TopicGroup from './topic-group';
import SubtopicGroup from './subtopic-group';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useBroadcastMutation } from '../hooks/use-broadcast-mutation';
import { useThrottleMutate } from '../hooks/use-throttle-mutate';
import {
  useCellCacheQuery,
  useTodoListCacheQuery,
} from '../hooks/use-mandalart-data-query';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import { createNewTodoRowValue } from '../services/create-new-todo-row-value';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import Spacer from '@/components/commons/spacer';
import { BicepsFlexed, CalendarDays, SquarePlus, X } from 'lucide-react';
import Title from '@/components/commons/title';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */

type FloatingSheetProps = {
  channelReceiver: RealtimeChannel;
};
const MandalartFloatingSheet = ({ channelReceiver }: FloatingSheetProps) => {
  // 클릭한 셀의 정보 받아오기
  const info = getDataCategory(
    useFloatingSheetStore((state) => state.info) as CellInfoType
  );
  const hide = useFloatingSheetStore((state) => state.hide);

  const { data: initialValue } = useCellCacheQuery(info);

  const [value, setValue] = useState<string>(initialValue ?? '');

  const { data: todoList } = useTodoListCacheQuery(info.id);
  const todoListCacheArray = (todoList ?? []) as TodoPayloadType[];

  const { mutate: createTodo } = useTodoBroadcastMutation(
    channelReceiver,
    createNewTodoRowValue(info.id)
  );

  const { mutate } = useBroadcastMutation(channelReceiver, { ...info, value });
  const throttleMutate = useThrottleMutate(mutate, 0.5 * 1000);

  let headerColor = '';
  if (info.category === 'TOPIC') {
    headerColor = getColorWithNumber(info.topic_index);
  }
  if (info.category === 'CORE') {
    headerColor = 'bg-violet-pigment';
  }

  const customButtonClass =
    'w-full inline-flex items-center text-main w-fit justify-center rounded-lg font-medium outline-none bg-beige-light hover:bg-[#DDCEC5] active:bg-[#CBB2A4] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] py-[12px] px-[20px] sm:py-[14px] sm:px-[22px] md:py-[16px] md:px-[24px]';

  return (
    <FloatingSheet>
      <div
        className='flex w-full flex-col space-y-4'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`handle cursor-grab px-5 active:cursor-grabbing ${headerColor}`}
        >
          <div className='fixed right-4 top-4 w-fit'>
            <button className='bg-transparent' onClick={hide}>
              <X />
            </button>
          </div>
          <div className='flex flex-col items-start p-8'>
            <Text size='16px-medium' textColor='sub'>
              TO DO LIST
            </Text>

            {info.category === 'CORE' ? (
              <>
                <Title as='h2' size='28px-semibold'>
                  2025년 성장의 해로 만들기
                </Title>
                <div className='flex'>
                  <CalendarDays color='var(--color-sub)' />
                  <Text textColor='sub'>365일 남음</Text>
                </div>
                <Spacer size='sm' />
                <div className='flex'>
                  <BicepsFlexed color='var(--color-sub)' />
                  <Text textColor='sub'>이번년도 반드시 이루고 말거야 !</Text>
                </div>
              </>
            ) : (
              <>
                <Input
                  sizes='28px-regular'
                  type='text'
                  value={value}
                  placeholder={value || '목표를 작성해 주세요'}
                  onChange={(e) => {
                    setValue(e.target.value);
                    throttleMutate();
                  }}
                />
                <Text size='18px-medium' textColor='sub'>
                  2025년, 성장의 해로 만들기 &gt; {value}
                </Text>
              </>
            )}
          </div>
        </div>
        <div className='max-h-[550px] overflow-y-auto'>
          {/* 핵심주제일 경우 */}
          {info.category === 'CORE' && (
            <div>
              {info.mandalart_topics?.map((topic) => (
                <TopicGroup
                  key={topic.id}
                  topic={topic}
                  channelReceiver={channelReceiver}
                />
              ))}
            </div>
          )}
          {/* 대주제일 경우 */}
          {info.category === 'TOPIC' && (
            <div>
              {info.mandalart_subtopics?.map((sub) => (
                <SubtopicGroup
                  key={sub.id}
                  sub={sub}
                  channelReceiver={channelReceiver}
                />
              ))}
            </div>
          )}
          {/* 소주제일 경우 */}
          {info.category === 'SUBTOPIC' && (
            <div className='px-8'>
              <button
                className={customButtonClass}
                onClick={() => createTodo()}
              >
                <SquarePlus />
                투두 리스트 추가하기
              </button>
              {todoListCacheArray.map((todo: TodoType) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  cellId={todo}
                  channelReceiver={channelReceiver}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Spacer size='lg' />
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
