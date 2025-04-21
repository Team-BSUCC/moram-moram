export const getColorWithIndexOrder = (index: number): string => {
  const idx = index % 8;
  const color: Record<number, string> = {
    0: 'bg-pink-pastel',
    1: 'bg-red-pastel',
    2: 'bg-orange-pastel',
    3: 'bg-yellow-pastel',
    4: 'bg-green-pastel',
    5: 'bg-sky-pastel',
    6: 'bg-blue-pastel',
    7: 'bg-purple-pastel',
  };

  return color[idx];
};
