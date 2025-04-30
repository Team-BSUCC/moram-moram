'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import GuestMandalartBlock from '@/modules/guest/components/guest-mandalart-block';
import GuestMandalartMainBlock from '@/modules/guest/components/guest-mandalart-main-block';
import GuestModal from '@/modules/guest/components/guest-modal';
import GuestNavigation from '@/modules/guest/components/guest-navigation';
import { useGuestTopicStore } from '@/modules/guest/hooks/use-guest-topic-store';
import {
  useDownloadMandalartInCanvas,
  useDownloadMandalartWithOutCanvas,
} from '@/modules/guest/hooks/use-download-mandalart';
import { useOnBeforeUnload } from '@/shared/hooks/use-on-before-unload';
import { usePanzoomController } from '@/shared/hooks/use-canvas-controller';
import React, { useEffect, useState } from 'react';

const DESKTOP_SIZE = 1024;

const GuestPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const screenResize = () => {
      if (window.innerWidth >= DESKTOP_SIZE) {
        setIsDesktop(true);
      }

      if (window.innerWidth < DESKTOP_SIZE) {
        setIsDesktop(false);
      }
    };

    if (window.innerWidth >= DESKTOP_SIZE) {
      setIsDesktop(true);
    }

    window.addEventListener('resize', screenResize);
    return () => window.removeEventListener('resize', screenResize);
  }, []);

  const { gridRef, panzoomRef, resetCanvas } = usePanzoomController();

  const title = useGuestTopicStore((state) => state.core);

  useOnBeforeUnload(title !== '');

  const { handleDownloadCanvas } = useDownloadMandalartInCanvas(
    gridRef,
    panzoomRef,
    title
  );
  const { handleDownload } = useDownloadMandalartWithOutCanvas(gridRef, title);

  return (
    <div className='flex flex-col place-items-center'>
      <Spacer size='top' />
      <div className='bg-white-light'>
        <div className='flex w-full flex-col items-center justify-center justify-items-center'>
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

        {isDesktop ? (
          // 데스크탑 그리드
          <div
            ref={gridRef}
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
        ) : (
          // 모바일 그리드
          <div className='relative flex h-[100dvw] w-screen flex-1 items-center justify-center overflow-hidden bg-transparent'>
            <div className='absolute bottom-2 right-2 z-20 items-center rounded-full bg-[rgba(0,0,0,0.3)]'>
              <button className='p-2 text-md text-white' onClick={resetCanvas}>
                초기화
              </button>
            </div>
            <div className='pointer-events-none absolute inset-0 z-10 overflow-hidden shadow-[inset_0px_0px_20px_0px_rgba(0,0,0,0.3)]' />
            <div
              ref={gridRef}
              className='z-0 grid min-w-[888px] grid-cols-3 grid-rows-3 gap-5 bg-white-light p-3 text-md'
              style={{ touchAction: 'none' }}
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
        )}
      </div>

      {/* 버튼 영역 */}
      <Spacer size='xl' />
      <div className='flex w-full justify-center gap-[12px] sm:gap-[14px] md:gap-[16px]'>
        <Button
          onClick={() => {
            if (window.innerWidth >= 1024) {
              return setIsModalOpen(true);
            }
            setIsSheetOpen(true);
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
          onClick={async () => {
            setIsDownloading(true);
            if (panzoomRef === null) return handleDownload(setIsDownloading);
            handleDownloadCanvas(setIsDownloading);
          }}
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
