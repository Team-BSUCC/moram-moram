'use client';

import Title from '@/components/commons/title';
import { X } from 'lucide-react';
import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import DateUnitSelect from './date-unit-select';
import { useDateOptionList } from '../hooks/use-date-option-list';
import { DateRangeState } from '../types/dashboard-type';

type CalendarDropDownProps = {
  isOpen: boolean;
  onClose: () => void;
  date: DateRangeState;
  setDate: Dispatch<SetStateAction<DateRangeState>>;
};

const CalendarDropDown = ({
  isOpen,
  onClose,
  date,
  setDate,
}: CalendarDropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    yearList: startYearList,
    monthList: startMonthList,
    dayList: startDayList,
  } = useDateOptionList('yes', date.startYear, date.startMonth);

  const {
    yearList: endYearList,
    monthList: endMonthList,
    dayList: endDayList,
  } = useDateOptionList('yes', date.endYear, date.endMonth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='absolute left-1/2 z-10 w-[347px] -translate-x-1/2 rounded-lg border border-stroke bg-white-light shadow-md'
      ref={dropdownRef}
    >
      <div className='flex h-[250px] flex-col'>
        <div className='flex h-[32px] w-full justify-end'>
          <X
            className='mr-[12px] mt-[12px] cursor-pointer'
            onClick={onClose}
            size={24}
          />
        </div>

        <div className='flex flex-col gap-y-[24px]'>
          <div className='flex flex-col gap-[16px] px-[24px]'>
            <Title as='h5' size='20px-medium' weight='semi'>
              시작일
            </Title>
            <div className='flex gap-[16px]'>
              <DateUnitSelect
                unit='Year'
                target='start'
                value={date.startYear}
                optionList={startYearList}
                handleChangeDate={setDate}
              />
              <DateUnitSelect
                unit='Month'
                target='start'
                value={date.startMonth}
                optionList={startMonthList}
                handleChangeDate={setDate}
              />
              <DateUnitSelect
                unit='Day'
                target='start'
                value={date.startDay}
                optionList={startDayList}
                handleChangeDate={setDate}
              />
            </div>
          </div>

          <div className='flex flex-col gap-[16px] px-[24px]'>
            <Title as='h5' size='20px-medium' weight='semi'>
              종료일
            </Title>
            <div className='flex gap-[16px]'>
              <DateUnitSelect
                unit='Year'
                target='end'
                value={date.endYear}
                optionList={endYearList}
                handleChangeDate={setDate}
              />
              <DateUnitSelect
                unit='Month'
                target='end'
                value={date.endMonth}
                optionList={endMonthList}
                handleChangeDate={setDate}
              />
              <DateUnitSelect
                unit='Day'
                target='end'
                value={date.endDay}
                optionList={endDayList}
                handleChangeDate={setDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDropDown;
