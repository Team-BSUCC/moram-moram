// app/sitemap.ts
import URLS from '@/shared/constants/url-constants';
import { MetadataRoute } from 'next';

/**
 * 사이트맵 생성 함수
 *
 * 사이트맵은 검색 엔진에 웹사이트의 페이지 구조를 알려주는 파일입니다.
 * 일반적으로 공개적으로 접근 가능한 페이지만 포함해야 합니다.
 *
 * 회원 전용 페이지(/dashboard, /my-page, /today-list, /mandalart/[id])는
 * 사이트맵에 포함하지 않았습니다.
 * 1. 검색 엔진 크롤러가 로그인 없이 접근할 수 없어 크롤링 효율이 떨어짐
 * 2. 사용자가 검색 결과에서 해당 페이지로 이동해도 바로 내용을 볼 수 없음
 * 3. 개인정보가 포함된 페이지는 검색 엔진에 노출되지 않는 것이 바람직함
 *
 * 속성 설명:
 * - url: 페이지 전체 URL
 * - priority: 페이지 중요도 (0.0~1.0), 1.0이 가장 중요
 * - changeFrequency: 페이지 업데이트 빈도 (always, hourly, daily, weekly, monthly, yearly, never)
 *    - 'always': 페이지 접속마다 변경되는 경우
 *    - 'hourly': 시간마다 업데이트되는 페이지
 *    - 'daily': 매일 업데이트되는 페이지
 *    - 'weekly': 주간 업데이트되는 페이지
 *    - 'monthly': 월간 업데이트(정적 페이지에 적합)
 *
 * @returns  사이트맵 배열
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 기본 URL 설정 - 실제 도메인으로 변경 필요
  const baseUrl = 'https://www.manda.io.kr';
  const currentDate = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}${URLS.SIGN_IN}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${URLS.SIGN_UP}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${URLS.GUEST}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
