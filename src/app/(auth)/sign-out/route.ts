import { getServerClient } from '@/shared/utils/supabase/server-client';
import { NextResponse } from 'next/server';

export const route = async () => {
  const supabase = getServerClient();
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
};
