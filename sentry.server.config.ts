import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 트레이스를 샘플링할 확률을 정하는 옵션
  tracesSampleRate: 1,

  // 콘솔에 디버그 정보를 출력할지 여부
  debug: false,
});
