export const getColorWithNumber = (index: number): string => {
  const idx = index % 8;
  const color: Record<number, string> = {
    0: 'bg-pink-pastel',
    1: 'bg-red-pastel',
    2: 'bg-orange-pastel',
    3: 'bg-purple-pastel',
    4: 'bg-yellow-pastel',
    5: 'bg-blue-pastel',
    6: 'bg-sky-pastel',
    7: 'bg-green-pastel',
  };

  return color[idx];
};
