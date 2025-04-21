export const formatDate = (date: Date): string => {
  const str = date.toString();
  const [year, month, day] = str.split('-').map(Number);
  return `${year}.${month}.${day}`;
};
