import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import URLS from '@/shared/constants/url-constants';
import { useElementWidthObserver } from '@/shared/hooks/use-element-width-observer';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type GuestModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isSheetOpen: boolean;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const IMAGE_VIEW_SIZE = 585;
const DESKTOP_SIZE = 1024;

const GuestModal = ({
  isModalOpen,
  setIsModalOpen,
  isSheetOpen,
  setIsSheetOpen,
}: GuestModalProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_SIZE) {
        setIsSheetOpen(false);
      }

      if (window.innerWidth < DESKTOP_SIZE) {
        setIsModalOpen(false);
      }
    };

    if (window.innerWidth >= DESKTOP_SIZE) {
      setIsModalOpen(true);
    } else {
      setIsSheetOpen(true);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isActive, setIsActive] = useState<boolean>(false);

  const { ref, width } = useElementWidthObserver();

  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSheetOpen]);

  const canImageView = width !== null && width >= IMAGE_VIEW_SIZE;

  const baseGradient = 'linear-gradient(90deg, #75AEDE 0%, #C985F8 100%)';
  const activeGradient = 'linear-gradient(90deg, #4F88C6 0%, #9A59DC 100%)';

  const eventStop = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div>
      {/* 모달 */}
      {isModalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
          onClick={handleModalClose}
        >
          <div
            ref={ref}
            className='aspect-guestModal h-full max-h-[860px] w-auto max-w-[627px] overflow-scroll rounded-lg bg-white-light shadow-xl'
          >
            {/* 닫기 */}
            <div className='flex justify-end'>
              <button
                className='absolute h-[60px] w-[60px] place-items-center'
                onClick={(e) => {
                  eventStop(e);
                  handleModalClose();
                }}
              >
                <X size={32} />
              </button>
            </div>

            {/* 모달 내용 */}
            <div
              onClick={(e) => {
                eventStop(e);
              }}
              className='flex flex-col place-items-center justify-center gap-y-4 px-[40px] pb-[32px] pt-[48px] text-center'
            >
              <div>
                <Image
                  alt='만다라트 작성법'
                  src='/images/guest/modal-image.png'
                  width={547}
                  height={562}
                  className='h-full w-full'
                  draggable={false}
                />
              </div>
              <div className='flex h-full w-full rounded-lg bg-stroke'>
                <div
                  className={`flex w-full place-items-center ${canImageView ? 'justify-between' : 'place-content-center'} p-[24px]`}
                >
                  <div className='flex max-w-[347px] flex-col gap-y-[8px] break-keep'>
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
                    <Link href={URLS.DASHBOARD}>
                      <button
                        className='flex max-h-[51px] w-full max-w-[347px] flex-row items-center justify-center gap-1.5 rounded-[8px] px-6 py-3 font-medium text-white'
                        style={{
                          background: isActive ? activeGradient : baseGradient,
                        }}
                        onMouseDown={() => setIsActive(true)}
                        onMouseUp={() => setIsActive(false)}
                        onMouseLeave={() => setIsActive(false)}
                        onTouchStart={() => setIsActive(true)}
                        onTouchEnd={() => setIsActive(false)}
                        onTouchCancel={() => setIsActive(false)}
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
      )}

      {/* 바텀 시트 */}
      {isSheetOpen && (
        <>
          {/* 뒷 배경 */}
          <div
            className='fixed inset-0 z-10 bg-[rgba(0,0,0,0.6)]'
            onClick={handleSheetClose}
          />

          {/* 바텀 시트 내용*/}
          <div
            onClick={(e) => {
              eventStop(e);
            }}
            className={`fixed bottom-0 left-0 z-50 flex h-4/6 w-full transform justify-center overflow-y-scroll rounded-tl-lg rounded-tr-lg bg-white-light transition-transform duration-300 ease-in-out ${
              isSheetOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className='flex h-full w-full max-w-[627px] flex-col'>
              <div className='flex justify-end'>
                <button className='absolute p-6' onClick={handleSheetClose}>
                  <X size={24} />
                </button>
              </div>

              <div className='flex flex-col gap-y-[32px] px-[24px] pt-[48px]'>
                <div className='flex flex-col items-center'>
                  <Image
                    alt='만다라트 작성법'
                    src='/images/guest/modal-image.png'
                    width={347}
                    height={362}
                    className='h-full w-full'
                    draggable={false}
                  />
                </div>

                <div className='flex w-full pb-[24px]'>
                  <div className='flex w-full place-items-center justify-center rounded-lg bg-stroke p-[24px]'>
                    <div className='flex max-w-[347px] flex-col place-items-center gap-y-[8px] break-keep'>
                      <Title as='h4' size='18px-medium' textColor='main'>
                        그런데도 뭘 적어야 할지 모르겠다 싶다면?
                      </Title>
                      <Text size='16px-regular' textColor='sub' align='center'>
                        3초만에 회원가입하고, AI의 도움을 받아보세요! 입력하신
                        키워드를 바탕으로 자동으로 제안해드릴게요.
                      </Text>
                      <Link href={URLS.DASHBOARD}>
                        <button
                          className='flex max-h-[51px] w-full max-w-[347px] flex-row items-center justify-center gap-1.5 rounded-[8px] px-6 py-3 font-medium text-white'
                          style={{
                            background: isActive
                              ? activeGradient
                              : baseGradient,
                          }}
                          onMouseDown={() => setIsActive(true)}
                          onMouseUp={() => setIsActive(false)}
                          onMouseLeave={() => setIsActive(false)}
                          onTouchStart={() => setIsActive(true)}
                          onTouchEnd={() => setIsActive(false)}
                          onTouchCancel={() => setIsActive(false)}
                        >
                          3초만에 AI와 함께 시작해보기
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GuestModal;
