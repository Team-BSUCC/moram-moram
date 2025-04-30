import { useElementWidthObserver } from '@/shared/hooks/use-element-width-observer';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';

type InstructionModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isSheetOpen: boolean;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const DESKTOP_SIZE = 1024;

const InstructionModal = ({
  isModalOpen,
  setIsModalOpen,
  isSheetOpen,
  setIsSheetOpen,
}: InstructionModalProps) => {
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

  const { ref } = useElementWidthObserver();

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
                  src='/images/mandalart/instruction-guide.png'
                  width={547}
                  height={562}
                  className='h-full w-full'
                  draggable={false}
                />
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
                <div className='mb-10 flex flex-col items-center'>
                  <Image
                    alt='만다라트 작성법'
                    src='/images/mandalart/instruction-guide.png'
                    width={347}
                    height={500}
                    className='h-full w-full'
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstructionModal;
