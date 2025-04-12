import Button from '@/components/commons/button';
import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useMemo, useState } from 'react';
import { CellInfoType, TodoType } from '../types/realtime-type';
import TodoItem from './todo-item';
import { getDataCategory } from '../services/get-data-category';
import TopicGroup from './topic-group';
import SubtopicGroup from './subtopic-group';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useBroadcastMutation } from '../hooks/use-broadcast-mutation';
import { throttleMutate } from '../services/throttle-mutate';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */

type Props = {
  channelReceiver: RealtimeChannel;
};
const MandalartFloatingSheet = ({ channelReceiver }: Props) => {
  // 클릭한 셀의 정보 받아오기
  const [value, setValue] = useState<string>('');

  const info = getDataCategory(
    useFloatingSheetStore((state) => state.info) as CellInfoType
  );

  const { mutate } = useBroadcastMutation(channelReceiver, { ...info, value });
  const throttledMutate = useMemo(() => throttleMutate(mutate, 100), [mutate]);

  return (
    <FloatingSheet>
      <div className='space-y-4 p-4'>
        <Input
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            throttledMutate();
          }}
          placeholder={info.content || info.title || info.topic || ''}
        />
        {/* 핵심주제일 경우 */}
        {info.category === 'CORE' && (
          <div>
            <Text>대주제</Text>
            {info.mandalart_topics?.map((topic) => (
              <TopicGroup key={topic.id} topic={topic} />
            ))}
          </div>
        )}
        {/* 대주제일 경우 */}
        {info.category === 'TOPIC' && (
          <div>
            <Text>소주제</Text>
            {info.mandalart_subtopics?.map((sub) => (
              <SubtopicGroup key={sub.id} sub={sub} />
            ))}
          </div>
        )}
        {/* 소주제일 경우 */}
        {info.category === 'SUBTOPIC' && (
          <div>
            <Text>할 일</Text>
            {info.cell_todos?.map((todo: TodoType) => (
              <TodoItem key={todo.id} id={todo.id} />
            ))}
          </div>
        )}

        <Text>새 투두 추가</Text>
        <Input type='text' placeholder='할 일을 입력하세요' />
        <Button>추가하기</Button>
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
