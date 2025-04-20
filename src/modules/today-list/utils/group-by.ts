/**
 * groupBy 함수
 * @param array - 그룹핑할 배열
 * @param key - 그룹핑할 키
 * @returns
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce(
    (acc, item) => {
      const groupKey = item[key] as string;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
};
