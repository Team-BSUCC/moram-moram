'use client';

import { useAlertStore } from '@/shared/hooks/use-alert-store';
import Image from 'next/image';
import Button from './button';

export const Alert = () => {
  const { isOpen, type, title, message, onConfirm, onCancel, closeAlert } =
    useAlertStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    closeAlert();
  };

  const handleCancel = () => {
    onCancel?.();
    closeAlert();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className='z-100 fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
    >
      <div className='flex -translate-y-16 flex-col items-center justify-center'>
        <Image
          src='/images/progress/30.png'
          alt='alert'
          width={100}
          height={100}
          className='h-30 w-32'
        />
        <div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
          <h2 className='mb-2 text-xl font-bold'>{title}</h2>
          <p className='text-gray-600 mb-4'>{message}</p>

          <div className='flex justify-center space-x-2'>
            {type === 'confirm' && <Button onClick={handleCancel}>취소</Button>}
            <Button size='small' onClick={handleConfirm}>
              {type === 'confirm' ? '확인' : '닫기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
