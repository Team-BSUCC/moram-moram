import React from 'react';
import Text from '@/components/commons/text';
import { useClientStateStore } from '../hooks/use-client-state-store';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';

const CoreCell = () => {
  const show = useTodoFloatingSheetStore((state) => state.show);
  const setInfo = useTodoFloatingSheetStore((state) => state.setInfo);

  const core = useClientStateStore((state) => state.core);

  const handleClick = () => {
    setInfo(core);
    show();
  };

  return (
    <>
      {/* 셀의 스타일 지정 */}
      <div
        onClick={handleClick}
        className='relative z-10 col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-[3px] border-black bg-violet-pigment p-2 transition-all hover:cursor-pointer'
      >
        <Text
          align='center'
          weight='bold'
          size='16px-semibold'
          textColor='main'
        >
          {core?.title}
        </Text>
      </div>
    </>
  );
};

export default React.memo(CoreCell);
