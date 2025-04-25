import Text from '@/components/commons/text';
import { signOutAction } from '../actions/sign-out-action';
import Button from '@/components/commons/button';

const SignOutForm = () => {
  return (
    <form action={signOutAction} className='w-full'>
      <Button variant='profile' type='submit'>
        <Text size='logout-button-text'>로그아웃</Text>
      </Button>
    </form>
  );
};

export default SignOutForm;
