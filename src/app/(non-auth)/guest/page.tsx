'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import GuestMandalartBlock from '@/modules/guest/components/guest-mandalart-block';
import GuestMandalartMainBlock from '@/modules/guest/components/guest-mandalart-main-block';
import { useGuestTopicStore } from '@/modules/guest/hooks/use-guest-topic-store';
import { toPng } from 'html-to-image';
import React, { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { useOnBeforeUnload } from '@/shared/hooks/use-on-before-unload';
import { errorAlert } from '@/shared/utils/sweet-alert';
import GuestModal from '@/modules/guest/components/guest-modal';
import GuestNavigation from '@/modules/guest/components/guest-navigation';

const ONE_SECOND = 1000; // 1초

const DESKTOP_SIZE = 1024; // 데스크탑 사이즈

const GuestPage = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_SIZE) {
        return setIsModalOpen(false);
      }
      if (window.innerWidth < DESKTOP_SIZE) {
        setIsNavigationOpen(false);
        return setIsSheetOpen(false);
      }
    };

    if (window.innerWidth >= DESKTOP_SIZE) {
      setIsModalOpen(true);
    }

    if (window.innerWidth < DESKTOP_SIZE) {
      setIsSheetOpen(true);
      setIsNavigationOpen(true);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const title = useGuestTopicStore((state) => state.core);

  const ref = useRef<HTMLDivElement>(null);

  useOnBeforeUnload(title !== '');

  const handleDownload = async () => {
    if (ref.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(ref.current);
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
      setTimeout(() => setIsDownloading(false), ONE_SECOND);
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'guest');
        scope.setTag('feature', 'Img Download Error');

        Sentry.captureException(new Error(`[Guest Page] ${error}`));
      });
      errorAlert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className='flex flex-col place-items-center'>
      <Spacer size='top' />
      <div className='bg-white-light p-2 md:p-5'>
        {/* 만다라트 타이틀 */}
        <div className='w-full flex-col justify-items-center'>
          <Title as='h1' size='32px-semibold'>
            나만의 만다라트 작성하기
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

        {/* 만다라트 그리드 */}
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

      {/* 버튼 영역 */}
      <Spacer size='xl' />
      <div className='flex w-full justify-center gap-[12px] sm:gap-[14px] md:gap-[16px]'>
        <Button
          onClick={() => {
            if (window.innerWidth >= DESKTOP_SIZE) {
              return setIsModalOpen(true);
            }
            if (window.innerWidth < DESKTOP_SIZE) {
              return setIsSheetOpen(true);
            }
          }}
          variant='default'
          size='medium'
        >
          작성법 보기
        </Button>
        <Button
          disabled={isDownloading}
          variant='secondary'
          size='medium'
          onClick={handleDownload}
        >
          {isDownloading ? '이미지 저장중...' : '이미지 저장하기'}
        </Button>
      </div>
      <GuestModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
      <GuestNavigation
        isNavigationOpen={isNavigationOpen}
        setIsNavigationOpen={setIsNavigationOpen}
      />
      <Spacer size='3xl' />
    </div>
  );
};

export default GuestPage;
