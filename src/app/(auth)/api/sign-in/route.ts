// /app/api/sign-in/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';
import { SignInDTO } from '@/modules/auth/types/auth-type';
import * as Sentry from '@sentry/nextjs';

export const POST = async (request: NextRequest) => {
  const { email, password }: SignInDTO = await request.json();
  const res = NextResponse.json({ ok: true });
  const supabase = getServerClientAction();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'sign-in');
      scope.setTag('feature', 'sign-in route');

      Sentry.captureException(new Error(`[Sign-in Route] ${error.message}`));
    });
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return res;
};
