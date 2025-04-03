import { getServerClient } from '@/shared/utils/supabase/server-client';
import SignOutButton from '@/modules/auth/components/sign-out-button';

const HomePage = async () => {
  const supabase = getServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      로그인된 유저의 이메일: {user.user_metadata.email}
      <div>
        로그인된 유저의 닉네임:{' '}
        {user.user_metadata.nickname ?? user.user_metadata.name}
      </div>
      <SignOutButton />
    </div>
  );
};

export default HomePage;
