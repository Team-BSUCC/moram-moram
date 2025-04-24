export const getProcessedDate = (date: string) => {
  const daysKor = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysKor[new Date(date).getDay()];
  return changeDateSeparator(date) + ' ' + dayOfWeek;
};

export const changeDateSeparator = (date: string) => {
  return date.replaceAll('-', '.');
};
