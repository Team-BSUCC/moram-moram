import { NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const nextPath = searchParams.get('next') ?? '/';

  // 환경변수를 통해 절대 URL을 구성 (예: production에서는 https://moram-moram.vercel.app)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (code) {
    const supabase = getServerClientAction();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${siteUrl}${nextPath}`);
    }
  }
  return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`);
};
