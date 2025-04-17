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
      link.download = 'exported-image.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      /**
       * TODO : 에러 sentry로 핸들링하기
       */
      // console.error('이미지 변환 실패:', error);
    }
  };

  return (
    <div className='flex-col place-items-center'>
      <Spacer size='3xl' />
      <div className='bg-white-light p-2 md:w-[1024px] md:p-5' ref={ref}>
        <div className='w-full flex-col justify-items-center'>
          <Title as='h1' highlightColor={2}>
            {title || '나만의 만다라트 작성하기'}
          </Title>
          <Spacer size='lg' />
          <Text size='default' align='center'>
            지금 당신의 목표를 81칸에 정리해보세요. 작은 계획들이 큰 변화를
            만듭니다.
          </Text>
          <Spacer size='xl' />
        </div>
        <div className='grid w-fit grid-cols-3 grid-rows-3 gap-2 text-ss md:gap-5 md:text-md'>
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
      <Spacer size='3xl' />
      <div className='flex w-full justify-center'>
        <Button variant='outline' size='default' onClick={handleDownload}>
          이미지 저장하기
        </Button>
      </div>
      <Spacer size='3xl' />
    </div>
  );
};

export default GuestPage;
