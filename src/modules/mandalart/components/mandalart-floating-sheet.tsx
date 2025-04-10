import Button from '@/components/commons/button';
import CheckBox from '@/components/commons/check-box';
import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useState } from 'react';
import { ExtendedCellInfo, TodoType } from '../types/realtime-type';

/**
 * Todo floating sheet 컴포넌트
 * @returns
 */
const MandalartFloatingSheet = () => {
  // 클릭한 셀의 정보 받아오기
  const showInfo = useFloatingSheetStore(
    (state) => state.showInfo
  ) as ExtendedCellInfo;
  const [value, setValue] = useState<string>('');

  return (
    <FloatingSheet>
      <div>
        <Input
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={
            showInfo.content || showInfo.title || showInfo.topic || ''
          }
        />
        <Text>투두</Text>
        <Input type='text' />
        <Button>추가하기</Button>
        {/* 기존에 DB에 저장된 투두 */}
        {showInfo?.cell_todos?.map((todo: TodoType) => (
          <div className='flex' key={todo.id}>
            <CheckBox />
            <div>{todo.title}</div>
          </div>
        ))}
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
