/* eslint-disable indent */
export const getSelectedLabel = (option: string) => {
  switch (option) {
    case 'left':
      return '남은 할 일';
    case 'done':
      return '완료한 일';
    case 'all':
    default:
      return '전체 보기';
  }
};
