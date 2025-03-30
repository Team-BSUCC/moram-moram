import { getServerClient } from '@/shared/utils/supabase/server-client';

export default async function HomePage() {
  const supabase = getServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return <div>로그인된 유저의 이메일: {user.email}</div>;
}
