import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import SignOutButton from '@/modules/auth/components/sign-out-button';

const HomePage = async () => {
  const user = await getUserInfo();

  if (!user) {
    return <div>로그아웃 상태입니다</div>;
  }

  return (
    <div>
      로그인된 유저의 이메일: {user.user_metadata.email}
      <div>
        로그인된 유저의 닉네임:
        {user.user_metadata.nickname ?? user.user_metadata.name}
      </div>
      <SignOutButton />
    </div>
  );
};

export default HomePage;
