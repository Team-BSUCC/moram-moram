'use client';

import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

const supabase = getBrowserClient();

export const signWithGoogle = async () => {
  const { origin } = window.location;
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/callback`,
    },
  });
  if (data) alert('로그인 되었습니다.');
};

export const signWithKaKao = async () => {
  const { origin } = window.location;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${origin}/callback`,
    },
  });
  if (error) throw error;
  if (data) alert('로그인 되었습니다.');
};
