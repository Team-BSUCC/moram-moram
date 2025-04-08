'use client';

import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import URL from '@/shared/constants/url-constants';

const supabase = getBrowserClient();
const API = 'api';

export const signWithGoogle = async () => {
  const { origin } = window.location;
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/${API}/${URL.CALL_BACK}`,
    },
  });
};

export const signWithKaKao = async () => {
  const { origin } = window.location;
  await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${origin}/${API}/${URL.CALL_BACK}`,
    },
  });
};
