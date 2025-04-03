import GoogleLoginButton from '@/modules/auth/components/google-login-button';
import KaKaoLoginButton from '@/modules/auth/components/kakao-login-button';
import SignInForm from '@/modules/auth/components/sign-in-form';

const SignInPage = () => {
  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-xl font-bold'>로그인</h1>
      <SignInForm />
      <GoogleLoginButton />
      <KaKaoLoginButton />
    </div>
  );
};

export default SignInPage;
