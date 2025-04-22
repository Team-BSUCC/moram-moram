import React from 'react';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import Text from '@/components/commons/text';
import { useClientStateStore } from '../hooks/use-client-state.store';

const CoreCell = () => {
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const core = useClientStateStore((state) => state.core);

  const handleClick = () => {
    setInfo(core.values);
    show();
  };

  return (
    <>
      {/* 셀의 스타일 지정 */}
      <div
        onClick={handleClick}
        className='relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-2 p-2 hover:cursor-pointer'
      >
        <Text
          align='center'
          weight='bold'
          size='16px-semibold'
          textColor='main'
        >
          {core}
        </Text>
      </div>
    </>
  );
};

export default React.memo(CoreCell);
