/* eslint-disable indent */
import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Text from '@/components/commons/text';
import { getSelectedLabel } from '../utils/get-selected-label';

type OrderOptionSelectionProps = {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

const OrderOptionSelection = ({
  selectedOption,
  setSelectedOption,
}: OrderOptionSelectionProps) => {
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
  };

  return (
    <div className='flex w-full items-center justify-end'>
      <Dropdown
        selection
        text={<Text>{getSelectedLabel(selectedOption)}</Text>}
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
    </div>
  );
};

export default OrderOptionSelection;
