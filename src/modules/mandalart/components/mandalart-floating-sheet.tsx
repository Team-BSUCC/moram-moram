import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import TodoItem from './todo-item';
import TopicGroup from './topic-group';
import SubtopicGroup from './subtopic-group';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import Spacer from '@/components/commons/spacer';
import { BicepsFlexed, CalendarDays, SquarePlus, X } from 'lucide-react';
import Title from '@/components/commons/title';
import { formatDate } from '@/modules/dashboard/util/format-date';
import { getDateDiff } from '@/modules/dashboard/util/calculate-date';
import { useClientStateStore } from '../hooks/use-client-state-store';
import { useChannelStore } from '../hooks/use-channel-store';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import { createNewTodoRowValue } from '../services/create-new-todo-row-value';
import { useCellBroadcastMutation } from '../hooks/use-cell-broadcast-mutation';
import { useThrottleMutateWithTrailing } from '../hooks/use-arg-throttle-mutate';
import { useEscapeKey } from '@/shared/hooks/use-escape-key';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import {
  MandalartFloatingSheetInfo,
  MandalartSubtopic,
} from '../types/realtime-type';
import AiSuggestButton from './ai-suggest-button';
import CheckBox from '@/components/commons/check-box';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */

const EmptyGuide = ({ children }: { children: string }) => {
  return (
    <div className='flex flex-col items-center'>
      <Spacer size='lg' />
      <Text textColor='sub'>{children}</Text>
    </div>
  );
};

const MandalartFloatingSheet = () => {
  const info = useFloatingSheetStore((state) => state.info) as Exclude<
    MandalartFloatingSheetInfo,
    null | undefined
  >;
  const hide = useFloatingSheetStore((state) => state.hide);
  useEscapeKey(hide);

  const core = useClientStateStore((state) => state.core);
  const topics = useClientStateStore((state) => state.topics);
  const getTopicItem = useClientStateStore((state) => state.getTopicItem);
  const subTopics = useClientStateStore((state) => state.subTopics);
  const getSubTopicItem = useClientStateStore((state) => state.getSubTopicItem);
  const todos = useClientStateStore((state) => state.todos);
  const inputRef = useRef<HTMLInputElement>(null);
  const isCreateTodo = useRef<boolean>(false);

  const isCore = 'private' in info;
  const isTopic = 'topic' in info;
  const isSubTopic = 'cellIndex' in info;

  const [inputValue, setInputValue] = useState<string>(() => {
    if (isCore) return info.title ?? '';
    if (isTopic) return info.topic ?? '';
    if (isSubTopic) return info.content ?? '';
    return '';
  });
  const subTopicDone = isSubTopic && info.isDone;
  const [isDoneState, setIsDoneState] = useState<boolean>(subTopicDone);

  const channel = useChannelStore((state) => state.channel);

  const { mutate: mutationTodo } = useTodoBroadcastMutation(channel);
  const { mutate: mutationCell } = useCellBroadcastMutation(channel);

  const throttleMutate = useThrottleMutateWithTrailing(
    mutationCell,
    0.5 * 1000
  );

  let thisTopic = null;
  if (isTopic) {
    thisTopic = getTopicItem(info.id);
  } else if (isSubTopic) {
    thisTopic = getTopicItem(info.topicId);
  }

  const thisSubTopic = isSubTopic
    ? (getSubTopicItem(`${info.topicId}-${info.id}`) as MandalartSubtopic)
    : null;

  useEffect(() => {
    //대주제일경우
    if (isTopic && thisTopic) {
      setInputValue(thisTopic.topic || '');
      return;
    }
    //소주제일경우
    if (isSubTopic && thisSubTopic) {
      setInputValue(thisSubTopic?.content || '');
      setIsDoneState(thisSubTopic?.isDone);
    }
  }, [thisTopic, thisSubTopic]);

  const charLimit = 15;
  const charLimitNotice = `글자 수 제한 ${inputValue.length} / ${charLimit}`;
  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length - 1 === charLimit) return;

    const newValue = e.target.value;
    setInputValue(newValue);
    if (isTopic && thisTopic) {
      throttleMutate({
        action: 'topic',
        value: { ...thisTopic, topic: newValue },
      });
    } else if (isSubTopic && thisSubTopic) {
      throttleMutate({
        action: 'subTopic',
        value: { ...thisSubTopic, content: newValue },
      });
    }
  };

  const handleInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  // core

  if (isCore) {
    const diff = getDateDiff(info.endDate);
    const topicGroupComponents = Array.from(topics)
      .filter(([_, value]) => value.topic)
      .map(([key, topic]) => <TopicGroup key={key} topic={topic} />);

    return (
      <FloatingSheet hideOnOutsideClick={true}>
        <div className='flex h-full flex-col'>
          <div className='handle cursor-grab rounded-t-lg bg-violet-pastel active:cursor-grabbing'>
            <div className='fixed right-4 top-4 w-fit'>
              <button className='hidden bg-transparent sm:block' onClick={hide}>
                <X />
              </button>
            </div>
            <div className='flex flex-col items-start pb-2 pl-6 pr-2 pt-6 lg:pb-2 lg:pl-8 lg:pr-2 lg:pt-8'>
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
                  {inputValue || '반드시 완수한다'}
                </Text>
              </div>
              <div className='mt-2 flex w-full justify-end'>
                <AiSuggestButton value={inputValue} type='core' />
              </div>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto py-6'>
            <div>
              {topicGroupComponents.length === 0 ? (
                <EmptyGuide>
                  핵심주제를 이루기 위한 대주제를 작성해주세요.
                </EmptyGuide>
              ) : (
                topicGroupComponents
              )}
            </div>
          </div>
          <Spacer size='4xl' />
        </div>
      </FloatingSheet>
    );
  }

  // topic

  if (isTopic) {
    const subTopicsWithTopicId = Array.from(subTopics)
      .filter(([_, value]) => value.topicId === info.id && value.content)
      .map(([_, value]) => value);
    const SubtopicGroupComponents = subTopicsWithTopicId.map((subtopic) => (
      <SubtopicGroup key={subtopic.id} sub={subtopic} />
    ));

    return (
      <FloatingSheet hideOnOutsideClick={true}>
        <div className='flex h-full flex-col'>
          <div
            className={`handle cursor-grab active:cursor-grabbing ${getColorWithNumber(info.topicIndex)} rounded-t-lg`}
          >
            <div className='fixed right-4 top-4 w-fit'>
              <button className='hidden bg-transparent sm:block' onClick={hide}>
                <X />
              </button>
            </div>
            <div className='flex flex-col items-start pb-2 pl-6 pr-2 pt-6 lg:pb-2 lg:pl-8 lg:pr-2 lg:pt-8'>
              <Text size='16px-medium' textColor='sub'>
                TO DO LIST - {charLimitNotice}
              </Text>
              <div className='no-drag'>
                <Input
                  ref={inputRef}
                  onKeyUp={handleInputKeyUp}
                  autoFocus
                  maxLength={charLimit}
                  sizes='28px-regular'
                  type='text'
                  value={inputValue}
                  placeholder={inputValue || '목표를 작성해 주세요'}
                  onChange={(e) => {
                    handleInputValueChange(e);
                  }}
                />
              </div>
              <Text size='18px-medium' textColor='sub'>
                {core?.title} &gt;{' '}
                {thisTopic?.topic || `대주제${thisTopic?.topicIndex}`}
              </Text>
              <div className='mt-2 flex w-full justify-end'>
                <AiSuggestButton value={inputValue} type='topic' />
              </div>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto py-6'>
            <div>
              {SubtopicGroupComponents.length === 0 ? (
                <EmptyGuide>
                  대주제를 이루기 위한 소주제를 작성해주세요.
                </EmptyGuide>
              ) : (
                SubtopicGroupComponents
              )}
            </div>
          </div>
          <Spacer size='4xl' />
        </div>
      </FloatingSheet>
    );
  }

  // subTopic

  if (isSubTopic && thisSubTopic) {
    const todosWithSubTopicId = Array.from(todos)
      .filter(([_, value]) => value.cellId === info.id)
      .map(([_, value]) => value);
    const todoItemComponents = todosWithSubTopicId.map((todo, index) => (
      <TodoItem
        key={todo.id + index}
        todo={todo}
        isCreateTodo={isCreateTodo.current}
      />
    ));

    const customButtonClass =
      'w-full inline-flex items-center text-main w-fit justify-center rounded-lg font-medium outline-none bg-beige-light hover:bg-[#DDCEC5] active:bg-[#CBB2A4] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px] py-[12px] px-[20px] sm:py-[14px] sm:px-[22px] md:py-[16px] md:px-[24px]';
    return (
      <FloatingSheet hideOnOutsideClick={true}>
        <div className='flex h-full flex-col'>
          <div className='handle cursor-grab rounded-t-lg active:cursor-grabbing'>
            <div className='fixed right-4 top-4 w-fit'>
              <button className='hidden bg-transparent sm:block' onClick={hide}>
                <X />
              </button>
            </div>
            <div className='flex flex-col items-start p-6 lg:p-8'>
              <Text size='16px-medium' textColor='sub'>
                TO DO LIST - {charLimitNotice}
              </Text>
              <div className='no-drag flex gap-3'>
                <CheckBox
                  sizes='lg'
                  checked={isDoneState}
                  onChange={() => {
                    mutationCell({
                      action: 'subTopic',
                      value: { ...thisSubTopic, isDone: !isDoneState },
                    });
                    setIsDoneState(!thisSubTopic.isDone);
                  }}
                />
                <Input
                  ref={inputRef}
                  onKeyUp={handleInputKeyUp}
                  autoFocus
                  maxLength={charLimit}
                  sizes='28px-regular'
                  type='text'
                  value={inputValue}
                  placeholder={inputValue || '목표를 작성해 주세요'}
                  onChange={(e) => {
                    handleInputValueChange(e);
                  }}
                />
              </div>
              <Text size='18px-medium' textColor='sub'>
                {core?.title} &gt;{' '}
                {thisTopic?.topic || `대주제${thisTopic?.topicIndex}`} &gt;{' '}
                {inputValue || '소주제'}
              </Text>
            </div>
            <div className='px-8'>
              <button
                className={customButtonClass}
                onClick={() => {
                  isCreateTodo.current = true;
                  mutationTodo({
                    value: createNewTodoRowValue(info.id),
                    action: 'CREATE',
                  });
                }}
              >
                <SquarePlus />
                투두 리스트 추가하기
              </button>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto py-6'>
            <div className='px-8'>
              {todoItemComponents.length === 0 ? (
                <EmptyGuide>
                  소주제를 이루기 위한 투두를 작성해주세요.
                </EmptyGuide>
              ) : (
                todoItemComponents
              )}
            </div>
          </div>
          <Spacer size='4xl' />
        </div>
      </FloatingSheet>
    );
  }
};

export default MandalartFloatingSheet;
