import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useState } from 'react';

const MandalartFloatingSheet = () => {
  const [value, setValue] = useState<string>('');
  const showId = useFloatingSheetStore((state) => state.showId);
  console.log(showId);
  return (
    <FloatingSheet>
      <div>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Text>투두</Text>
        <input type='text' />
      </div>
    </FloatingSheet>
  );
};

export default MandalartFloatingSheet;
