import { NextResponse, NextRequest } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
  }

  const redirectUrl = new URL(next, request.url);
  const res = NextResponse.redirect(redirectUrl);

  const supabase = getServerClientAction(res);
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('세션 교환 실패', error.message);
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
  }

  return res;
};
