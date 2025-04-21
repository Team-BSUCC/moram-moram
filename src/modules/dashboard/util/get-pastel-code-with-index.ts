export const getPastelCodeWithIndex = (index: number): string => {
  const idx = index % 8;
  const colorCode: Record<number, string> = {
    0: '#fbdee2',
    1: '#fcc8c7',
    2: '#fdcdba',
    3: '#fbf8cb',
    4: '#daedc3',
    5: '#e5f0f9',
    6: '#c5def1',
    7: '#d1d3f9',
  };

  return colorCode[idx];
};
