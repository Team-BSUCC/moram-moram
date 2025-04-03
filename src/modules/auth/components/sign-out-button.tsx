import { signOut } from '../services/auth-server-service';
import { redirect } from 'next/navigation';
import URL from '@/shared/constants/url-constants';
const SignOutButton = () => {
  const handleSignOut = async () => {
    'use server'; // 서버 액션으로 실행
    const result = await signOut();
    if (!result.error) {
      redirect(URL.HOME);
    }
  };
  return (
    <form action={handleSignOut}>
      <button type='submit'>로그아웃</button>
    </form>
  );
};

export default SignOutButton;
