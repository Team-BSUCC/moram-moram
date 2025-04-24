// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';
import * as Sentry from '@sentry/nextjs';

export const GET = async () => {
  const supabase = getServerClientAction();

  const {
    data: { session },
    error,
  } = await supabase.auth.refreshSession();

  if (error || !session) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'none');
      scope.setTag('feature', 'refresh route');

      Sentry.captureException(
        new Error(`[Refresh Route] ${error?.message ?? 'Unauthorized'}`)
      );
    });
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
};
