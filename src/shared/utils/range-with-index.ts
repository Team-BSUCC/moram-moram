export const rangeWithIndex = (
  index: number
): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  const idx = index % 8;

  if (idx < 1) return 0;
  if (idx < 2) return 1;
  if (idx < 3) return 2;
  if (idx < 4) return 3;
  if (idx < 5) return 4;
  if (idx < 6) return 5;
  if (idx < 7) return 6;
  return 7;
};
