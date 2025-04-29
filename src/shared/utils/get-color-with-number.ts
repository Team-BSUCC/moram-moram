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

export const getBorderColorWithNumber = (index: number): string => {
  const idx = index % 8;
  const color: Record<number, string> = {
    0: 'border-pink-pastel',
    1: 'border-red-pastel',
    2: 'border-orange-pastel',
    3: 'border-purple-pastel',
    4: 'border-yellow-pastel',
    5: 'border-blue-pastel',
    6: 'border-sky-pastel',
    7: 'border-green-pastel',
  };

  return color[idx];
};

export const getPigmentColorWithNumber = (index: number): string => {
  const idx = index % 8;
  const color: Record<number, string> = {
    0: 'bg-pink-pigment',
    1: 'bg-red-pigment',
    2: 'bg-orange-pigment',
    3: 'bg-purple-pigment',
    4: 'bg-yellow-pigment',
    5: 'bg-blue-pigment',
    6: 'bg-sky-pigment',
    7: 'bg-green-pigment',
  };

  return color[idx];
};
