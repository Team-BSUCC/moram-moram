import Text from '@/components/commons/text';
import { signOutAction } from '../actions/sign-out-action';

const SignOutForm = () => {
  return (
    <form action={signOutAction} className='w-full'>
      <button type='submit' className='px-6 py-4 text-left lg:px-8 lg:py-4'>
        <Text size='logout-button-text'>로그아웃</Text>
      </button>
    </form>
  );
};

export default SignOutForm;
