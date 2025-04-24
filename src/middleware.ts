// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import URLS from './shared/constants/url-constants';

// 보호할 경로
const PROTECTED_ROUTES = [
  URLS.CALENDAR,
  URLS.MY_PAGE,
  URLS.TODAY_LIST,
  URLS.MANDALART,
  URLS.DASHBOARD,
];
const AUTH_ROUTES = [URLS.SIGN_IN, URLS.SIGN_UP];

// token을 통해 로그인 상태 확인
const isSupabaseAuthToken = (cookie: { name: string }) =>
  cookie.name.startsWith('sb-') &&
  cookie.name.includes('-auth-token') &&
  !cookie.name.includes('code-verifier');

// middleware 함수
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 로그인때 사용할 수 있는 도메인 판단
  const isProtected = PROTECTED_ROUTES.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPage = AUTH_ROUTES.some((path) => pathname.startsWith(path));

  // Supabase 인증 토큰이 있는지 확인 (refresh_token 포함)
  const hasSupabaseSession = request.cookies.getAll().some(isSupabaseAuthToken);

  // 보호된 라우트인데 로그인 안 되어 있으면 → 로그인 페이지로 리디렉션
  if (isProtected && !hasSupabaseSession) {
    return NextResponse.redirect(new URL(URLS.SIGN_IN, request.url));
  }

  // 로그인 상태인데 로그인/회원가입 페이지에 접근하면 → 홈으로 리디렉션
  if (isAuthPage && hasSupabaseSession) {
    return NextResponse.redirect(new URL(URLS.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // 모든 페이지에 적용하되 예외는 빼줌
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
