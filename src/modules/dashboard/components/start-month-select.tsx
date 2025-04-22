'use client';
import Text from '@/components/commons/text';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRangeState } from '../types/dashboard-type';

type StartMonthSelectProps = {
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  monthList: string[];
  month: string;
};

const StartMonthSelect = ({
  handleChangeDate,
  monthList,
  month,
}: StartMonthSelectProps) => {
  const [selected, setSelected] = useState('1');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    handleChangeDate((prev) => {
      return { ...prev, startMonth: value };
    });
    setIsOpen(false);
  };

  return (
    <div className='relative max-h-[35px] w-full max-w-[88px]'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border-[2px] border-stroke bg-white-light px-[10px] py-[4px] text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text>{month || selected}월</Text> <ChevronDown />
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-[120px] w-full overflow-scroll rounded-lg border border-stroke bg-white-light shadow-md'>
          {monthList.map((month) => (
            <div
              key={month}
              onClick={() => handleSelect(month)}
              className={`cursor-pointer px-[10px] py-[4px] text-left hover:bg-lightgray ${
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

export default StartMonthSelect;
