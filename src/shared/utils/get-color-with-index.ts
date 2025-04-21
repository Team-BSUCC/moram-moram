/**
 * 색상 인덱스에 따라 Pigment 색상 코드를 반환하는 함수
 * @param index - 색상 인덱스
 * @returns - 색상 코드
 */
export const getPigmentCodeWithIndex = (index: number): string => {
  const idx = index % 8;
  const colorCode: Record<number, string> = {
    0: 'var(--color-pink-pigment)',
    1: 'var(--color-red-pigment)',
    2: 'var(--color-orange-pigment)',
    3: 'var(--color-yellow-pigment)',
    4: 'var(--color-green-pigment)',
    5: 'var(--color-sky-pigment)',
    6: 'var(--color-blue-pigment)',
    7: 'var(--color-purple-pigment)',
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
    0: 'var(--color-pink-pastel)',
    1: 'var(--color-red-pastel)',
    2: 'var(--color-orange-pastel)',
    3: 'var(--color-yellow-pastel)',
    4: 'var(--color-green-pastel)',
    5: 'var(--color-sky-pastel)',
    6: 'var(--color-blue-pastel)',
    7: 'var(--color-purple-pastel)',
  };
  return colorCode[idx];
};

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
