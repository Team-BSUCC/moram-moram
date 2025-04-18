'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import GuestMandalartBlock from '@/modules/guest/components/guest-mandalart-block';
import GuestMandalartMainBlock from '@/modules/guest/components/guest-mandalart-main-block';
import { useGuestTopicStore } from '@/modules/guest/hooks/use-guest-topic-store';
import { toPng } from 'html-to-image';
import React, { useRef } from 'react';

const GuestPage = () => {
  const title = useGuestTopicStore((state) => state.core);

  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ref.current === null) return;

    try {
      const dataUrl = await toPng(ref.current);
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      // TODO: sentry
    }
  };

  // TODO : 모달 기능 추가하기
  return (
    <div className='flex flex-col place-items-center'>
      <Spacer size='top' />
      <div className='bg-white-light p-2 md:p-5'>
        <div className='w-full flex-col justify-items-center'>
          <Title as='h1' size='32px-semibold'>
            {title || '나만의 만다라트 작성하기'}
          </Title>
          <Spacer size='sm' />
          <Text size='24px-regular' textColor='sub' align='center'>
            <span className='flex flex-col md:flex-row'>
              <span>지금 당신의 목표를 81칸에 정리해보세요.</span>
              <span>작은 계획들이 큰 변화를 만듭니다.</span>
            </span>
          </Text>
          <Spacer size='xl' />
        </div>

        <div
          ref={ref}
          className='grid w-[888px] grid-cols-3 grid-rows-3 gap-5 bg-white-light p-3 text-md'
        >
          <div className='col-start-2 row-start-2 aspect-square h-full'>
            <GuestMandalartMainBlock coreColor='bg-violet-pigment' />
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`block${index}`}>
              <GuestMandalartBlock index={index} />
            </div>
          ))}
        </div>
      </div>

      <Spacer size='xl' />
      <div className='flex w-full justify-center gap-[12px] sm:gap-[14px] md:gap-[16px]'>
        <Button variant='default' size='medium'>
          작성법 보기
        </Button>
        <Button variant='secondary' size='medium' onClick={handleDownload}>
          이미지 저장하기
        </Button>
      </div>
      <Spacer size='3xl' />
    </div>
  );
};

export default GuestPage;
