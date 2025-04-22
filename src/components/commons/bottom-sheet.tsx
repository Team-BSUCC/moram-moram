'use client';

import useBottomSheetStore from '@/shared/hooks/use-bottom-sheet-store';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type BottomSheetProps = {
  children: ReactNode;
};

/**
 * BottomSheet 공통 컴포넌트
 * 높이는 children에 맞춰서 자동 조절
 * @param children - BottomSheet에 들어갈 children
 * @returns
 */
const BottomSheet = ({ children }: BottomSheetProps) => {
  const isOpen = useBottomSheetStore((state) => state.isOpen);
  const close = useBottomSheetStore((state) => state.close);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className='fixed inset-0 z-[10] bg-black opacity-10'
            onClick={close}
          />

          {/* 시트 본체 */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-md bg-white-light shadow-xl'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
