import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import URLS from '@/shared/constants/url-constants';
import { useElementWidthObserver } from '@/shared/hooks/use-element-width-observer';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const DESKTOP_SIZE = 1024;
const IMAGE_VIEW_SIZE = 585;

type GuestModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const GuestModal = ({ isModalOpen, setIsModalOpen }: GuestModalProps) => {
  const [isActive, setIsActive] = useState(false);
  const { ref, width } = useElementWidthObserver();

  const canImageView = width !== null && width >= IMAGE_VIEW_SIZE;

  const closeModal = () => setIsModalOpen(false);

  const handleResize = () => {
    if (window.innerWidth <= DESKTOP_SIZE) closeModal();
  };

  const handleButtonActive = (active: boolean) => () => setIsActive(active);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
      onClick={closeModal}
    >
      <div
        ref={ref}
        className='aspect-guestModal relative h-full max-h-[860px] w-auto max-w-[627px] rounded-lg bg-white-light shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-0 top-0 m-2 grid h-[60px] w-[60px] place-items-center'
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <X size={32} />
        </button>

        <div className='flex flex-col items-center justify-center gap-y-4 px-10 pb-8 pt-12 text-center'>
          <Image
            alt='만다라트 작성법'
            src='/images/guest/modal-image.png'
            width={547}
            height={562}
            className='h-full w-full'
            draggable={false}
          />

          <div className='flex h-full w-full rounded-lg bg-stroke'>
            <div
              className={`flex w-full items-center ${canImageView ? 'justify-between' : 'justify-center'} p-6`}
            >
              <div className='flex max-w-[347px] flex-col gap-2 break-keep'>
                <Title
                  as='h4'
                  size={canImageView ? '18px-medium' : '16px-medium'}
                  textColor='main'
                >
                  그런데도 뭘 적어야 할지 모르겠다 싶다면?
                </Title>
                <Text
                  size={canImageView ? '16px-regular' : '14px-regular'}
                  textColor='sub'
                  align={canImageView ? 'left' : 'center'}
                >
                  {canImageView
                    ? '3초만에 회원가입하고, AI의 도움을 받아보세요! 입력하신 키워드를 바탕으로 자동으로 제안해드릴게요.'
                    : '3초만에 회원가입하고, AI의 도움을 받아보세요!'}
                </Text>

                <Link href={URLS.DASHBOARD} className='mt-2'>
                  <button
                    className='flex max-h-[51px] w-full max-w-[347px] items-center justify-center gap-1.5 rounded-lg px-6 py-3 font-medium text-white'
                    style={{
                      background: isActive
                        ? 'linear-gradient(90deg, #4F88C6 0%, #9A59DC 100%)'
                        : 'linear-gradient(90deg, #75AEDE 0%, #C985F8 100%)',
                    }}
                    onMouseDown={handleButtonActive(true)}
                    onMouseUp={handleButtonActive(false)}
                    onMouseLeave={handleButtonActive(false)}
                    onTouchStart={handleButtonActive(true)}
                    onTouchEnd={handleButtonActive(false)}
                    onTouchCancel={handleButtonActive(false)}
                  >
                    3초만에 AI와 함께 시작해보기
                  </button>
                </Link>
              </div>

              {canImageView && (
                <div className='aspect-square max-h-[110px] max-w-[110px]'>
                  <Image
                    alt='AI와 함께 시작해보기'
                    src='/images/guest/ai-button.png'
                    width={110}
                    height={110}
                    className='h-full w-full'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
