'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className='flex h-full w-full flex-col items-center justify-center bg-white-light'>
      <div className='mb-[12px] flex flex-col items-center justify-center'>
        <Title as='h1' size='64px-regular'>
          404
        </Title>
        <Spacer size='md' />
        <Text size='32px-medium' align='center'>
          아직 자라지 못한 페이지예요
        </Text>
      </div>

      <Image
        className='ml-[100px]'
        src='/images/error/error-image.png'
        alt='error'
        width={400}
        height={224}
      />

      <div className='my-[32px]'>
        <Text size='20px-medium' textColor='caption' align='center'>
          찾으려는 페이지가 아직 싹을 틔우지 못했어요.
          <br />
          이전으로 돌아가 목표를 향해 나아가볼까요?
        </Text>
      </div>

      <Button variant='error' onClick={() => router.back()}>
        <Text size='20px-medium'>이전으로 가기</Text>
      </Button>
    </div>
  );
};

export default NotFound;
