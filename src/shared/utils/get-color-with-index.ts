/**
 * 색상 인덱스에 따라 Pigment 색상 코드를 반환하는 함수
 * @param index - 색상 인덱스
 * @returns - 색상 코드
 */
export const getPigmentCodeWithIndex = (index: number): string => {
  const idx = index % 8;
  const colorCode: Record<number, string> = {
    0: '#F6B2BB',
    1: '#F99695',
    2: '#FB936A',
    3: '#F4EB6C',
    4: '#AAD676',
    5: '#9CC6E8',
    6: '#73B0DD',
    7: '#8E93F0',
  };
  return colorCode[idx];
};

/**
 * 색상 인덱스에 따라 Pastel 색상 코드를 반환하는 함수
 * @param index - 색상 인덱스
 * @returns - 색상 코드
 */
export const getPastelCodeWithIndex = (index: number): string => {
  const idx = index % 8;
  const colorCode: Record<number, string> = {
    0: '#FBDEE2',
    1: '#FCC8C7',
    2: '#FDCDBA',
    3: '#FBF8CB',
    4: '#DAEDC3',
    5: '#E5F0F9',
    6: '#C5DEF1',
    7: '#D1D3F9',
  };
  return colorCode[idx];
};
