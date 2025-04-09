import Button from '@/components/commons/button';
import CheckBox from '@/components/commons/check-box';
import FloatingSheet from '@/components/commons/floating-sheet';
import Input from '@/components/commons/input';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useState } from 'react';
import { StoreCellInfo, TodoType } from '../types/realtime-type';

const MandalartFloatingSheet = () => {
  const showInfo = useFloatingSheetStore(
    (state) => state.showInfo
  ) as StoreCellInfo;
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
