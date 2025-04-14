import { NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';

export const GET = async () => {
  const supabase = getServerClientAction();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
};
