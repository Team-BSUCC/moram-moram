import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const getServerClientAction = (res?: NextResponse) => {
  const reqCookies = cookies(); // 읽기 전용
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        getAll: () => reqCookies.getAll(),
        setAll: (toSet) => {
          if (!res) return; // res가 없으면 아무 것도 안 함
          for (const c of toSet) {
            res.cookies.set(c.name, c.value, c.options);
          }
        },
      },
    }
  );
};
