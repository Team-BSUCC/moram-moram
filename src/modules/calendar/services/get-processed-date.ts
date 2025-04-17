export const getProcessedDate = (date: string) => {
  return date.replaceAll('-', '.');
};
