'use client';
import RoundButton from '@/components/commons/round-button';
import { signWithKaKao } from '../services/auth-client-service';
import Image from 'next/image';

const KaKaoLoginButton = () => {
  return (
    <RoundButton
      type='button'
      onClick={signWithKaKao}
      size='lg'
      bgColor='kakao'
    >
      <Image
        src='/images/button-image/kakao-talk.png'
        alt='카카오 아이콘'
        width={30}
        height={30}
        className='max-w-xs self-center'
      />
    </RoundButton>
  );
};

export default KaKaoLoginButton;
