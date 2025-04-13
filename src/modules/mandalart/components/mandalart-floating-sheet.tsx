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
import { useTodoListCacheQuery } from '../hooks/use-mandalart-data-query';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import { createNewTodoRowValue } from '../services/create-new-todo-row-value';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */

type FloatingSheetProps = {
  channelReceiver: RealtimeChannel;
};
const MandalartFloatingSheet = ({ channelReceiver }: FloatingSheetProps) => {
  // 클릭한 셀의 정보 받아오기
  const [value, setValue] = useState<string>('');

  const info = getDataCategory(
    useFloatingSheetStore((state) => state.info) as CellInfoType
  );

  const { data: todoList } = useTodoListCacheQuery(info.id);
  const todoListCacheArray = (todoList ?? []) as TodoPayloadType[];

  const { mutate: createTodo } = useTodoBroadcastMutation(
    channelReceiver,
    createNewTodoRowValue(info.id)
  );

  const { mutate } = useBroadcastMutation(channelReceiver, { ...info, value });
  const throttleMutate = useThrottleMutate(mutate, 0.5 * 1000);

  return (
    <FloatingSheet>
      <div className='space-y-4 p-4'>
        <Input
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            throttleMutate();
          }}
          placeholder={info.content || info.title || info.topic || ''}
        />
        {/* 핵심주제일 경우 */}
        {info.category === 'CORE' && (
          <div>
            <Text>대주제</Text>
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
            <Text>소주제</Text>
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
          <div>
            <Text>할 일</Text>
            {todoListCacheArray.map((todo: TodoType) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                cellId={todo}
                channelReceiver={channelReceiver}
              />
            ))}

            <Button
              variant='outline'
              size='default'
              onClick={() => createTodo()}
            >
              투두 추가하기
            </Button>
          </div>
        )}
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
