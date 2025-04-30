import { useState } from 'react';
import { DateRangeState } from '../types/dashboard-type';

const today = new Date();
const initialDate = {
  startYear: today.getFullYear().toString(),
  startMonth: (today.getMonth() + 1).toString(),
  startDay: today.getDate().toString(),
  endYear: '',
  endMonth: '',
  endDay: '',
};

export const useMandalartForm = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [date, setDate] = useState<DateRangeState>(initialDate);
  const [selectedColor, setSelectedColor] = useState(0);

  const isDateValid = () => {
    const start = new Date(
      +date.startYear,
      +date.startMonth - 1,
      +date.startDay
    );
    const end = new Date(+date.endYear, +date.endMonth - 1, +date.endDay);
    return start <= end;
  };

  const isFilled = Object.values(date).every((v) => v !== '') && !!title;

  const resetForm = () => {
    setTitle('');
    setSubTitle('');
    setDate(initialDate);
    setSelectedColor(0);
  };

  return {
    title,
    setTitle,
    subTitle,
    setSubTitle,
    date,
    setDate,
    selectedColor,
    setSelectedColor,
    isDateValid,
    isFilled,
    resetForm,
  };
};
