export const formatDate = (date: Date): string => {
  const str = date.toString();
  const [year, month, day] = str.split('-').map(String);
  return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};
