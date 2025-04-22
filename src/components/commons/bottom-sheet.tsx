'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className='fixed inset-0 z-[10] bg-black opacity-10'
            onClick={onClose}
          />

          {/* 시트 본체 */}
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 h-3/5 w-full rounded-t-md bg-white-light shadow-xl'
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
