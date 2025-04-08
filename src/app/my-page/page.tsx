import { redirect } from 'next/navigation';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import UpdatePasswordForm from '@/modules/auth/components/update-password-form';
import URLS from '@/shared/constants/url-constants';

const MyPage = async () => {
  const user = await getUserInfo();

  if (!user || user.app_metadata?.provider !== 'email') {
    redirect(URLS.HOME);
  }
  return (
    <div className='mx-auto w-full max-w-md py-12'>
      <h1 className='mb-4 text-xl font-semibold'>비밀번호 재설정</h1>
      <UpdatePasswordForm email={user.user_metadata.email} />
    </div>
  );
};

export default MyPage;
