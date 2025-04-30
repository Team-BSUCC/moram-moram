'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Button from '@/components/commons/button';
import Text from '@/components/commons/text';
import Image from 'next/image';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center bg-white-light'>
      <div className='mb-[12px] flex flex-col items-center justify-center'>
        <Title as='h1' size='64px-regular'>
          Error
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
          {error.message || '알 수 없는 에러가 발생했어요.'}
        </Text>
      </div>

      <Button variant='error' onClick={() => reset()}>
        <Text size='20px-medium'>새로 고침</Text>
      </Button>
    </div>
  );
};
export default GlobalError;
