'use client';

import { useAlertStore } from '@/shared/hooks/use-alert-store';
import Image from 'next/image';
import Button from './button';
import Title from './title';
import Text from './text';
import { CircleAlert, CircleCheckBig, CircleX, Info } from 'lucide-react';

export const Alert = () => {
  const {
    isOpen,
    type,
    title,
    message,
    promiseResolve,
    closeAlert,
    isLoading,
    loadingStart,
    confirmText,
  } = useAlertStore();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (isLoading) {
      return;
    }
    loadingStart();
    promiseResolve?.(true);
    closeAlert();
  };

  const handleCancel = async () => {
    if (isLoading) {
      return;
    }
    promiseResolve?.(false);
    closeAlert();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className='fixed inset-0 z-100 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
    >
      <div className='flex -translate-y-8 flex-col items-center justify-center transition-transform'>
        <div className='animate-fade-in-top'>
          {type === 'confirm' && (
            <Image
              src='/images/progress/60.png'
              alt='confirmAlert'
              width={100}
              height={100}
              className='h-12 w-16'
              draggable={false}
            />
          )}
          {type === 'error' && (
            <Image
              src='/images/progress/0.png'
              alt='errorAlert'
              width={100}
              height={100}
              className='h-12 w-16'
              draggable={false}
            />
          )}
          {type === 'info' && (
            <Image
              src='/images/progress/30.png'
              alt='infoAlert'
              width={100}
              height={100}
              className='h-12 w-16'
              draggable={false}
            />
          )}
          {type === 'success' && (
            <Image
              src='/images/progress/100.png'
              alt='successAlert'
              width={100}
              height={100}
              className='h-12 w-16'
              draggable={false}
            />
          )}
        </div>
        <div className='w-80 rounded-lg bg-white px-6 pb-5 pt-3 shadow-lg'>
          <div className='flex flex-col items-center justify-center break-keep text-center'>
            <div className='animate-fadeInOnce pt-2'>
              {type === 'error' && <CircleX size={52} className='text-error' />}
              {type === 'info' && <Info size={52} className='text-secondary' />}
              {type === 'success' && (
                <CircleCheckBig size={52} className='text-[#52C41A]' />
              )}
              {type === 'confirm' && (
                <CircleAlert size={52} className='text-caption' />
              )}
            </div>
            <Title as='h2' textColor='main' size='28px-semibold'>
              {title}
            </Title>
            <Text align='center' textColor='sub' size='16px-medium'>
              {message}
            </Text>
          </div>

          <div className='flex justify-center space-x-2 pt-4'>
            <Button
              size='small'
              variant='default'
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading
                ? '로딩중...'
                : type === 'confirm'
                  ? confirmText
                  : '닫기'}
            </Button>
            {type === 'confirm' && (
              <Button
                size='small'
                variant='secondary'
                onClick={handleCancel}
                disabled={isLoading}
              >
                취소
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
