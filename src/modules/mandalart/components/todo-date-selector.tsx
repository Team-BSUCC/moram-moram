import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import TodoYearSelect from './todo-year-select';
import { ChevronRight, X } from 'lucide-react';
import Title from '@/components/commons/title';
import TodoMonthSelect from './todo-month-select';
import { DateRangeState } from '../types/realtime-type';
import TodoDaySelect from './todo-day-select';

type TodoDateSelectorProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleDate: Dispatch<SetStateAction<DateRangeState>>;
  date: DateRangeState;
  onChange: () => void;
};

const TodoDateSelector = ({
  isOpen,
  setIsOpen,
  handleDate,
  date,
  onChange,
}: TodoDateSelectorProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const yearList = Array.from({ length: 100 }, (_, idx) =>
    (idx + 2025).toString()
  );

  const monthList = Array.from({ length: 12 }, (_, idx) =>
    (idx + 1).toString()
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className='inline-block' ref={dropdownRef}>
      <div
        className='flex'
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        <button>
          <ChevronRight size={24} />
        </button>
      </div>
      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className='absolute left-1/2 z-10 w-[347px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-stroke bg-white-light shadow-md'
        >
          <div className='flex-col'>
            <div className='flex h-[145px] max-w-[347px] flex-col'>
              <div className='flex h-[32px] w-full justify-end'>
                <X
                  className='mr-[12px] mt-[12px] cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  size={24}
                />
              </div>
              <div className='flex flex-col gap-y-[24px]'>
                <div className='flex flex-col gap-[16px] px-[24px]'>
                  <Title as='h5' size='20px-medium' weight='semi'>
                    시작일
                  </Title>
                  <div className='flex gap-[16px]'>
                    <TodoYearSelect
                      yearList={yearList}
                      handleChangeDate={handleDate}
                      date={date.year}
                      onChange={onChange}
                    />
                    <TodoMonthSelect
                      monthList={monthList}
                      handleChangeDate={handleDate}
                      date={date.month}
                      onChange={onChange}
                    />
                    <TodoDaySelect
                      month={date.month}
                      year={date.year}
                      day={date.day}
                      handleChangeDate={handleDate}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDateSelector;
