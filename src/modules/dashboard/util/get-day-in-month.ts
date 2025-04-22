export const getDayInMonth = (year: string, month: string): string[] => {
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => (i + 1).toString());
};
