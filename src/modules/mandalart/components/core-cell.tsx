import React from 'react';
import Text from '@/components/commons/text';
import { useClientStateStore } from '../hooks/use-client-state-store';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

const CoreCell = () => {
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const core = useClientStateStore((state) => state.core);

  const handleFloatingToggle = () => {
    setInfo(core);
    show();
  };

  return (
    <div
      onClick={handleFloatingToggle}
      className='relative z-10 col-start-2 row-start-2 flex aspect-square h-[88px] w-[88px] max-w-full items-center justify-center overflow-hidden rounded-lg border-[3px] border-black bg-violet-pigment p-2 transition-all hover:cursor-pointer'
    >
      <Text align='center' weight='bold' size='16px-semibold' textColor='main'>
        {core?.title}
      </Text>
    </div>
  );
};

export default React.memo(CoreCell);
