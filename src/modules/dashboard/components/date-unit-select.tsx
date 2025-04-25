import React from 'react';
import { DateRangeState } from '../types/dashboard-type';

type DateUnit = 'Year' | 'Month' | 'Day';
type DateTarget = 'start' | 'end';

type Props = {
  unit: DateUnit;
  target: DateTarget;
  value: string;
  optionList: string[];
  handleChangeDate: React.Dispatch<React.SetStateAction<DateRangeState>>;
};

const DateUnitSelect = ({
  unit,
  target,
  value,
  optionList,
  handleChangeDate,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    handleChangeDate((prev) => ({
      ...prev,
      [`${target}${unit}`]: newValue,
    }));
  };

  return (
    <select
      value={value}
      onChange={(e) => {
        handleChange(e);
      }}
      className='border-gray-300 h-full w-full cursor-pointer rounded-lg border px-2 py-1 text-[14px] font-medium leading-[20px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[27px]'
    >
      <option value=''>선택</option>
      {optionList.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default DateUnitSelect;
