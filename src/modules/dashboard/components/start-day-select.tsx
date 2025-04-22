'use client';
import Text from '@/components/commons/text';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRangeState } from '../types/dashboard-type';
import { getDayInMonth } from '../util/get-day-in-month';

type StartDaySelectProps = {
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  year: string;
  month: string;
};

const StartDaySelect = ({
  handleChangeDate,
  month,
  year,
}: StartDaySelectProps) => {
  const dayList = getDayInMonth(year, month);
  const [selected, setSelected] = useState('1');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    handleChangeDate((prev) => {
      return { ...prev, startDay: value };
    });
    setIsOpen(false);
  };

  return (
    <div className='relative max-h-[35px] w-full max-w-[85px]'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border-[2px] border-stroke bg-white-light px-[8px] py-[4px] text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text>{selected}일</Text> <ChevronDown />
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-[120px] w-full overflow-scroll rounded-lg border border-stroke bg-white-light shadow-md'>
          {dayList.map((day) => (
            <div
              key={day}
              onClick={() => handleSelect(day)}
              className={`cursor-pointer px-[10px] py-[4px] text-left hover:bg-lightgray ${
                selected === day ? 'bg-white-dark' : ''
              }`}
            >
              <Text size='18px-medium' weight='md'>
                {day}일
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartDaySelect;
