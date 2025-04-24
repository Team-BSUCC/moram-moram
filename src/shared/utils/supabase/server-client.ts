import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const getServerClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
};
