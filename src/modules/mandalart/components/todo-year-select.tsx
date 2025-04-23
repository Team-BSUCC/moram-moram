'use client';
import Text from '@/components/commons/text';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRangeState } from '../types/realtime-type';

type TodoYearSelectProps = {
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  yearList: string[];
  date: string;
  onChange: () => void;
};

const TodoYearSelect = ({
  handleChangeDate,
  yearList,
  date,
  onChange,
}: TodoYearSelectProps) => {
  const [selected, setSelected] = useState('--');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selected !== '--') {
      onChange();
    }
  }, [selected]);

  const handleSelect = (value: string) => {
    setSelected(value);
    handleChangeDate((prev) => {
      return { ...prev, year: value };
    });
    setIsOpen(false);
  };

  return (
    <div className='relative max-h-[35px] w-full max-w-[94px]'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border-[2px] border-stroke bg-white-light px-[10px] py-[4px] text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text>{date || selected}</Text> <ChevronDown />
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-[120px] w-full overflow-scroll rounded-lg border border-stroke bg-white-light shadow-md'>
          {yearList.map((year) => (
            <div
              key={year}
              onClick={() => handleSelect(year)}
              className={`cursor-pointer px-[10px] py-[4px] text-left hover:bg-lightgray ${
                selected === year ? 'bg-white-dark' : ''
              }`}
            >
              <Text size='18px-medium' weight='md'>
                {year}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoYearSelect;
