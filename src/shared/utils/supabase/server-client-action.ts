import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const getServerClientAction = () => {
  const reqCookies = cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        getAll: () => reqCookies.getAll(),
        setAll: (toSet) => {
          for (const c of toSet) {
            reqCookies.set(c.name, c.value, c.options);
          }
        },
      },
    }
  );
};
