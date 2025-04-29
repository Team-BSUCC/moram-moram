/**
 * 만다라트 차트의 키워드를 생성하는 API에 요청하는 함수
 * @param topic - 중심 주제 (예: "다이어트", "전교 1등", "개발자 취업")
 * @param existingKeywords - 이미 존재하는 키워드 배열 (선택적)
 * @returns - 생성된 키워드 배열을 담은 객체
 */
import * as Sentry from '@sentry/nextjs';

export const fetchGetAiSuggestKeywords = async (
  topic: string,
  existingKeywords: string[] = []
) => {
  try {
    const response = await fetch('/api/mandalart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic,
        existingKeywords: existingKeywords,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '키워드 생성 실패');
    }

    const data = await response.json();

    return data.ideas; // { ideas: [...키워드 배열...] }
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'mandalart page');
      scope.setTag('feature', 'fetchGetAiSuggestKeywords');
      Sentry.captureException(
        new Error(`[fetchGetAiSuggestKeywords] ${error}`)
      );
    });
    throw error;
  }
};
