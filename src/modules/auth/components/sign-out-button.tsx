import { redirect } from 'next/navigation';
import { signOut } from '../services/auth-server-service';
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
      <button
        className='flex items-center justify-center gap-2.5 rounded-lg bg-[#F0E9E5] px-6 py-3 text-md'
        type='submit'
      >
        로그아웃
      </button>
    </form>
  );
};

export default SignOutButton;
