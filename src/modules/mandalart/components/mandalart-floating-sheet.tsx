import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import { useState } from 'react';
import { TodoPayloadType, TodoType } from '../types/realtime-type';
import TodoItem from './todo-item';
import { getDataCategory } from '../services/get-data-category';
import TopicGroup from './topic-group';
import SubtopicGroup from './subtopic-group';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useBroadcastMutation } from '../hooks/use-broadcast-mutation';
import { useThrottleMutate } from '../hooks/use-throttle-mutate';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import { createNewTodoRowValue } from '../services/create-new-todo-row-value';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import Spacer from '@/components/commons/spacer';
import { BicepsFlexed, CalendarDays, SquarePlus, X } from 'lucide-react';
import Title from '@/components/commons/title';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';
import { formatDate } from '@/modules/dashboard/util/format-date';
import { getDateDiff } from '@/modules/dashboard/util/calculate-date-differents';
import { useClientStateStore } from '../hooks/use-client-state-store';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */

type FloatingSheetProps = {
  channelReceiver: RealtimeChannel;
};
const MandalartFloatingSheet = ({ channelReceiver }: FloatingSheetProps) => {
  const info = useTodoFloatingSheetStore((state) => state.info);

  const hide = useTodoFloatingSheetStore((state) => state.hide);

  const [value, setValue] = useState<string>();

  // const { mutate: createTodo } = useTodoBroadcastMutation(
  //   channelReceiver,
  //   createNewTodoRowValue(info.id)
  // );

  // const { mutate } = useBroadcastMutation(channelReceiver, { ...info, value });
  // const throttleMutate = useThrottleMutate(mutate, 0.5 * 1000);
  if (info === null) {
    return console.error('플로팅시트 안열림');
  }

  if (info === undefined) {
    return console.error('플로팅시트 안열림');
  }

  // core
  if ('private' in info) {
    const diff = getDateDiff(info.endDate);
    const topics = useClientStateStore((state) => state.topics);

    return (
      <FloatingSheet hideOnOutsideClick={true}>
        <div className='flex h-full flex-col'>
          <div className='handle cursor-grab rounded-t-lg bg-violet-pastel active:cursor-grabbing'>
            <div className='fixed right-4 top-4 w-fit'>
              <button className='bg-transparent' onClick={hide}>
                <X />
              </button>
            </div>
            <div className='flex flex-col items-start p-6 lg:p-8'>
              <Text size='16px-medium' textColor='sub'>
                TO DO LIST
              </Text>
              <Title as='h2' size='28px-semibold'>
                {info.title}
              </Title>
              <div className='flex gap-[8px]'>
                <CalendarDays color='var(--color-sub)' size={30} />
                <div className='flex gap-[8px]'>
                  <Text size='20px-medium' textColor='sub'>
                    {diff < 0
                      ? `${Math.abs(diff)}일 지남`
                      : diff === 0
                        ? '오늘까지'
                        : `${diff}일 남음`}
                  </Text>
                  <Text
                    size='20px-regular'
                    textColor='caption'
                  >{`${formatDate(info.startDate)} - ${formatDate(info.endDate)}`}</Text>
                </div>
              </div>
              <Spacer size='sm' />
              <div className='flex gap-[8px]'>
                <BicepsFlexed color='var(--color-sub)' size={30} />
                <Text size='20px-medium' textColor='sub'>
                  {info.subTitle}
                </Text>
              </div>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto py-6'>
            <div>
              {Array.from(topics).map(([key, topic]) => (
                <TopicGroup
                  key={key}
                  topic={topic}
                  channelReceiver={channelReceiver}
                />
              ))}
            </div>
          </div>
          <Spacer size='4xl' />
        </div>
      </FloatingSheet>
    );
  }

  // topic
  if ('topic' in info) {
    const coreTitle = useClientStateStore((state) => state.core);
    const subTopics = useClientStateStore((state) => state.subTopics);

    const subTopicsWithTopicId = Array.from(subTopics)
      .filter(([key, value]) => value.topicId === info.id)
      .map(([_, value]) => value);

    return (
      <FloatingSheet hideOnOutsideClick={true}>
        <div className='flex h-full flex-col'>
          <div
            className={`handle cursor-grab active:cursor-grabbing ${getColorWithNumber(info.topicIndex)} rounded-t-lg`}
          >
            <div className='fixed right-4 top-4 w-fit'>
              <button className='bg-transparent' onClick={hide}>
                <X />
              </button>
            </div>
            <div className='flex flex-col items-start p-6 lg:p-8'>
              <Text size='16px-medium' textColor='sub'>
                TO DO LIST
              </Text>
              <Input
                sizes='28px-regular'
                type='text'
                value={value}
                placeholder={value || '목표를 작성해 주세요'}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Text size='18px-medium' textColor='sub'>
                {coreTitle?.title} &gt; {info.topic}
              </Text>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto py-6'>
            <div>
              {subTopicsWithTopicId.map((subtopic) => (
                <SubtopicGroup
                  key={subtopic.id}
                  sub={subtopic}
                  channelReceiver={channelReceiver}
                />
              ))}
            </div>
          </div>
          <Spacer size='4xl' />
        </div>
      </FloatingSheet>
    );
  }

  // subTopic
  const coreTitle = useClientStateStore((state) => state.core);
  const parentTopic = useClientStateStore((state) =>
    state.getTopicItem(info.topicId)
  );
  const todos = useClientStateStore((state) => state.todos);
  const todosWithSubTopicId = Array.from(todos)
    .filter(([key, value]) => value.cellId === info.id)
    .map(([_, value]) => value);

  const customButtonClass =
    'w-full inline-flex items-center text-main w-fit justify-center rounded-lg font-medium outline-none bg-beige-light hover:bg-[#DDCEC5] active:bg-[#CBB2A4] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] py-[12px] px-[20px] sm:py-[14px] sm:px-[22px] md:py-[16px] md:px-[24px]';

  return (
    <FloatingSheet hideOnOutsideClick={true}>
      <div className='flex h-full flex-col'>
        <div
          className={`handle cursor-grab rounded-t-lg active:cursor-grabbing`}
        >
          <div className='fixed right-4 top-4 w-fit'>
            <button className='bg-transparent' onClick={hide}>
              <X />
            </button>
          </div>
          <div className='flex flex-col items-start p-6 lg:p-8'>
            <Text size='16px-medium' textColor='sub'>
              TO DO LIST
            </Text>
            <Input
              sizes='28px-regular'
              type='text'
              value={value}
              placeholder={value || '목표를 작성해 주세요'}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Text size='18px-medium' textColor='sub'>
              {coreTitle?.title} &gt; {parentTopic?.topic} &gt; {info.content}
            </Text>
          </div>
        </div>
        <div className='flex-grow overflow-y-auto py-6'>
          <div className='px-8'>
            <button className={customButtonClass} onClick={() => {}}>
              <SquarePlus />
              투두 리스트 추가하기
            </button>
            {todosWithSubTopicId.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                todo={todo}
                channelReceiver={channelReceiver}
              />
            ))}
          </div>
        </div>
        <Spacer size='4xl' />
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
