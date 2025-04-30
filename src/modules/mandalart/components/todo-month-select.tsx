'use client';
import Text from '@/components/commons/text';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRangeState } from '../types/realtime-type';

type TodoMonthSelectProps = {
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  monthList: string[];
  date: string;
  onChange: () => void;
};

const TodoMonthSelect = ({
  handleChangeDate,
  monthList,
  date,
  onChange,
}: TodoMonthSelectProps) => {
  const [selected, setSelected] = useState('-');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selected !== '-') {
      onChange();
    }
  }, [selected]);

  const handleSelect = (value: string) => {
    setSelected(value);
    handleChangeDate((prev) => {
      return { ...prev, month: value };
    });
    setIsOpen(false);
  };

  return (
    <div className='relative max-h-[35px] w-full max-w-[88px]'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border-[2px] border-stroke bg-white-light px-[10px] py-[4px] text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text>{date || selected}월</Text> <ChevronDown />
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-[120px] w-full overflow-scroll rounded-lg border border-stroke bg-white-light shadow-md'>
          {monthList.map((month) => (
            <div
              key={month}
              onClick={() => handleSelect(month)}
              className={`hover:bg-gray-lightgray cursor-pointer px-[10px] py-[4px] text-left ${
                selected === month ? 'bg-white-dark' : ''
              }`}
            >
              <Text size='18px-medium' weight='md'>
                {month}월
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoMonthSelect;
