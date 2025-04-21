export const getPigmentCodeWithIndex = (index: number): string => {
  const idx = index % 8;
  const colorCode: Record<number, string> = {
    0: '#f6b2bb',
    1: '#f99695',
    2: '#fb936a',
    3: '#f4eb6c',
    4: '#aad676',
    5: '#9cc6e8',
    6: '#73b0dd',
    7: '#8e93f0',
  };

  return colorCode[idx];
};
