import { signOut } from '@/modules/auth/services/auth-server-service';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const supabase = getServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const handleSignOut = async () => {
    'use server'; // 서버 액션으로 실행
    const result = await signOut();
    if (!result.error) {
      redirect('/');
    }
  };

  return (
    <div>
      로그인된 유저의 이메일: {user.user_metadata.email}
      <div>
        로그인된 유저의 닉네임:{' '}
        {user.user_metadata.nickname ?? user.user_metadata.name}
      </div>
      <form action={handleSignOut}>
        <button type='submit'>로그아웃</button>
      </form>
    </div>
  );
};

export default HomePage;
