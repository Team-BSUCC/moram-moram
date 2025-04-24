const parseDate = (str: string): Date => {
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const getToday = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1);
  const dd = String(today.getDate());
  return `${yyyy}-${mm}-${dd}`;
};

export const getDateDiff = (endStr: Date): number => {
  const end = parseDate(endStr.toString());
  const now = parseDate(getToday());

  const diffTime = end.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
};
