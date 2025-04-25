/* eslint-disable indent */

export const testGetAiSuggestionAPI = (arr: string[]) => {
  switch (arr.length) {
    case 0:
      return ['안0', '녕0', '하0', '세0', '요0', '일0', '이0', '삼0'];

    case 1:
      return ['안1', '녕1', '하1', '세1', '요1', '일1', '이1'];

    case 2:
      return ['안2', '녕2', '하2', '세2', '요2', '일2'];

    case 3:
      return ['안3', '녕3', '하3', '세3', '요3'];

    case 4:
      return ['안4', '녕4', '하4', '세4'];

    case 5:
      return ['안5', '녕5', '하5'];

    case 6:
      return ['안6', '녕6'];

    case 7:
      return ['안7'];
  }
  return [];
};
