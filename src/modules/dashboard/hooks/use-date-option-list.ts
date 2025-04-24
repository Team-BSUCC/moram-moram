export const useDateOptionList = (
  noPast: 'yes' | 'no',
  year: string,
  month: string
) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  const yearList = Array.from({ length: 100 }, (_, i) =>
    (2025 + i).toString()
  ).filter((y) => (noPast === 'yes' ? +y >= currentYear : true));

  const monthList = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString()
  ).filter((m) => {
    if (noPast === 'yes' && +year === currentYear) {
      return +m >= currentMonth;
    }
    return true;
  });

  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const maxDays = year && month ? getDaysInMonth(+year, +month) : 31;

  const dayList = Array.from({ length: maxDays }, (_, i) =>
    (i + 1).toString()
  ).filter((d) => {
    if (noPast === 'yes' && +year === currentYear && +month === currentMonth) {
      return +d >= currentDay;
    }
    return true;
  });

  return { yearList, monthList, dayList };
};
