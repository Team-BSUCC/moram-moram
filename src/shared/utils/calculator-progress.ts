export const calculatorProgress = (value: number): number => {
  const base = 64;
  return Math.round((value / base) * 100 * 10) / 10;
};
