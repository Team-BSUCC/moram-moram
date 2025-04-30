'use client';
import Text from '@/components/commons/text';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getDayInMonth } from '@/modules/dashboard/util/get-day-in-month';
import { DateRangeState } from '../types/realtime-type';

type TodoDaySelectProps = {
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  year: string;
  month: string;
  day: string;
  onChange: () => void;
};

const TodoDaySelect = ({
  handleChangeDate,
  month,
  year,
  day,
  onChange,
}: TodoDaySelectProps) => {
  const dayList = getDayInMonth(year, month);
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
      return { ...prev, day: value };
    });
    setIsOpen(false);
  };

  return (
    <div className='relative max-h-[35px] w-full max-w-[85px]'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border-[2px] border-stroke bg-white-light px-[8px] py-[4px] text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text>{day || selected}일</Text> <ChevronDown />
      </div>

      {/* 옵션 목록 */}
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-[120px] w-full overflow-scroll rounded-lg border border-stroke bg-white-light shadow-md'>
          {dayList.map((day) => (
            <div
              key={day}
              onClick={() => handleSelect(day)}
              className={`hover:bg-gray-lightgray cursor-pointer px-[10px] py-[4px] text-left ${
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

export default TodoDaySelect;
