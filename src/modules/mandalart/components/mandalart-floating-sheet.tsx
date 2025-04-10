import Button from '@/components/commons/button';
import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useState } from 'react';
import { ExtendedCellInfo, TodoType } from '../types/realtime-type';
import TodoItem from './todo-item';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */
const MandalartFloatingSheet = () => {
  // 클릭한 셀의 정보 받아오기
  const [value, setValue] = useState<string>('');

  const processQueryKey = (info: ExtendedCellInfo) => {
    if ('private' in info) {
      return { ...info, category: 'CORE' };
    }
    if ('topic' in info) {
      return { ...info, category: 'TOPIC' };
    }
    if ('cell_index' in info) {
      return { ...info, category: 'SUBTOPIC' };
    }
    if ('cell_id' in info) {
      return { ...info, category: 'TODO' };
    }
    return info;
  };

  const showInfo = processQueryKey(
    useFloatingSheetStore((state) => state.showInfo) as any
  );

  return (
    <FloatingSheet>
      <div className='space-y-4 p-4'>
        <Input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            showInfo.content || showInfo.title || showInfo.topic || ''
          }
        />

        {showInfo.category === 'CORE' && (
          <>
            <Text>대주제</Text>
            {showInfo.mandalart_topics?.map((topic: any) => (
              <div key={topic.id} className='pl-2'>
                <div className='text-blue-700'>{topic.topic}</div>
                <Text>소주제</Text>
                {topic.mandalart_subtopics?.map((sub: any) => (
                  <div key={sub.id} className='pl-4'>
                    <div>{sub.content}</div>
                    {sub.cell_todos?.map((todo: TodoType) => (
                      <TodoItem key={todo.id} id={todo.id} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {showInfo.category === 'TOPIC' && (
          <>
            <Text>소주제</Text>
            {showInfo.mandalart_subtopics?.map((sub: any) => (
              <div key={sub.id} className='pl-2'>
                <div>{sub.content}</div>
                {sub.cell_todos?.map((todo: TodoType) => (
                  <TodoItem key={todo.id} id={todo.id} />
                ))}
              </div>
            ))}
          </>
        )}

        {showInfo.category === 'SUBTOPIC' && (
          <>
            <Text>할 일</Text>
            {showInfo.cell_todos?.map((todo: TodoType) => (
              <TodoItem key={todo.id} id={todo.id} />
            ))}
          </>
        )}

        <Text>새 투두 추가</Text>
        <Input type='text' placeholder='할 일을 입력하세요' />
        <Button>추가하기</Button>
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
