/**
 * DB에 저장된 색상 인덱스와 공통 색상 인덱스를 매칭하는 함수
 * @param index - 색상 인덱스
 * @returns - 색상 인덱스에 따라 매칭되는 색상 인덱스
 */
export const matchWithCommonColor = (index: number): number => {
  const idx = index % 8;
  const colorCode: Record<number, number> = {
    0: 0,
    1: 1,
    2: 2,
    3: 4,
    4: 7,
    5: 6,
    6: 5,
    7: 3,
  };
  return colorCode[idx];
};
