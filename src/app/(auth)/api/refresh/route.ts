// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';

export const GET = async () => {
  const supabase = getServerClientAction();

  const {
    data: { session },
    error,
  } = await supabase.auth.refreshSession();

  if (error || !session) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
};
