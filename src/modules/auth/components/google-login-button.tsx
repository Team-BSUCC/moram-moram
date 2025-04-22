'use client';
import RoundButton from '@/components/commons/round-button';
import { signWithGoogle } from '../services/auth-client-service';
import Image from 'next/image';

const GoogleLoginButton = () => {
  return (
    <RoundButton onClick={signWithGoogle} size='lg'>
      <Image
        src='/images/button-image/google.svg'
        alt='구글 아이콘'
        width={30}
        height={30}
        className='max-w-xs self-center'
      />
    </RoundButton>
  );
};

export default GoogleLoginButton;
