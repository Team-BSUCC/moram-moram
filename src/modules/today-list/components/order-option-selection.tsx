/* eslint-disable indent */
import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Text from '@/components/commons/text';
import { getSelectedLabel } from '../utils/get-selected-label';
import { useState } from 'react';

type OrderOptionSelectionProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

const OrderOptionSelection = ({
  selectedOption,
  setSelectedOption,
}: OrderOptionSelectionProps) => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const handleSelectOption = (label: string) => {
    switch (label) {
      case 'left':
        setSelectedOption('left');
        break;
      case 'done':
        setSelectedOption('done');
        break;
      case 'all':
        setSelectedOption('all');
        break;
    }
    setIsChanged(true);
  };

  return (
    <div className='mb-4 flex w-full items-center justify-end'>
      <Button variant='secondary' size='small'>
        <Dropdown
          selection
          text={<Text>{getSelectedLabel(selectedOption)}</Text>}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        >
          <Button variant='none' onClick={() => handleSelectOption('left')}>
            남은 할 일
          </Button>
          <Button variant='none' onClick={() => handleSelectOption('done')}>
            완료한 일
          </Button>
          <Button variant='none' onClick={() => handleSelectOption('all')}>
            전체 보기
          </Button>
        </Dropdown>
      </Button>
    </div>
  );
};

export default OrderOptionSelection;
