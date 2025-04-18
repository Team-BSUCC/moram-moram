// /app/api/sign-in/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerClientAction } from '@/shared/utils/supabase/server-client-action';
import { SignInDTO } from '@/modules/auth/types/auth-type';

export const POST = async (request: NextRequest) => {
  const { email, password }: SignInDTO = await request.json();
  const res = NextResponse.json({ ok: true });
  const supabase = getServerClientAction();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return res;
};
