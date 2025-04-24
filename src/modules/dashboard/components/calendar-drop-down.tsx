'use client';

import Title from '@/components/commons/title';
import { ChevronRight, X } from 'lucide-react';
import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { DateRangeState } from '../types/dashboard-type';
import StartYearSelect from './start-year-select';
import StartMonthSelect from './start-month-select';
import StartDaySelect from './start-day-select';
import EndYearSelect from './end-year-select';
import EndMonthSelect from './end-month-select';
import EndDaySelect from './end-day-select';

type CalendarDropDownProps = {
  isOpen: boolean;
  handleChangeDate: Dispatch<SetStateAction<DateRangeState>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  date: DateRangeState;
};

const CalendarDropDown = ({
  handleChangeDate,
  isOpen,
  setIsOpen,
  date,
}: CalendarDropDownProps) => {
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
            <div className='flex h-[250px] max-w-[347px] flex-col'>
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
                    <StartYearSelect
                      date={date.startYear}
                      yearList={yearList}
                      handleChangeDate={handleChangeDate}
                    />
                    <StartMonthSelect
                      month={date.startMonth}
                      monthList={monthList}
                      handleChangeDate={handleChangeDate}
                    />
                    <StartDaySelect
                      year={date.startYear}
                      month={date.startMonth}
                      handleChangeDate={handleChangeDate}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-[16px] px-[24px]'>
                  <Title as='h5' size='20px-medium' weight='semi'>
                    종료일
                  </Title>
                  <div className='flex gap-[16px]'>
                    <EndYearSelect
                      date={date.endYear}
                      yearList={yearList}
                      handleChangeDate={handleChangeDate}
                    />
                    <EndMonthSelect
                      month={date.endMonth}
                      monthList={monthList}
                      handleChangeDate={handleChangeDate}
                    />
                    <EndDaySelect
                      year={date.endYear}
                      month={date.endMonth}
                      handleChangeDate={handleChangeDate}
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

export default CalendarDropDown;
