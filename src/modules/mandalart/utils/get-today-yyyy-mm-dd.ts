export const getTodayDateYYYYMMDD = (): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate());

  return `${year}-${month}-${day}`;
};
