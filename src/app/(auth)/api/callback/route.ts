import { NextResponse, NextRequest } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';

  if (!code) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
  }

  // 1) Response 객체를 먼저 만들고
  const redirectUrl = new URL(next, request.url);
  const res = NextResponse.redirect(redirectUrl);

  // 2) 그걸 넘겨줘야 setAll()이 동작
  const supabase = getServerClientAction(res);

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error('세션 교환 실패', error.message);
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
  }

  return res;
};
