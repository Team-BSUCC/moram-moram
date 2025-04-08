import { NextResponse } from 'next/server';
import { getServerClient } from '@/shared/utils/supabase/server-client';

export const POST = async () => {
  const supabase = getServerClient();
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
};
