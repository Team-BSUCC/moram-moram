import { NextResponse } from 'next/server';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import * as Sentry from '@sentry/nextjs';

export const GET = async () => {
  const supabase = getServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase.rpc(
    'fetch_user_rooms_and_participants',
    {
      target_user_id: user.id,
    }
  );

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'DashBoard');
      scope.setTag('feature', 'fetch_user_rooms_and_participants');

      Sentry.captureException(new Error(`[Dashboard Route] ${error.message}`));
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
};
