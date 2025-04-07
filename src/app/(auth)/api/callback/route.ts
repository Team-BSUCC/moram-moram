import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';
import { NextResponse } from 'next/server';

// 서버 측 인증 지침에서 생성한 클라이언트
export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // 매개변수에 "next"가 있으면 이를 리디렉트 URL로 사용
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = getServerClientAction();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // 로드 밸런서 이전의 원래 원점
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // 중간에 로드 밸런서가 없으므로 X-Forwarded-Host를 감시할 필요 없음
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};
