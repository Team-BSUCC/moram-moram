'use client';

import Button from '@/components/commons/button';
import { useState, useRef, useEffect } from 'react';
const CardButtonDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      <Button onClick={() => setIsOpen((prev) => !prev)}>...</Button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-32 space-y-2 rounded-lg border border-lightgray bg-white p-2 shadow-md'>
          <div className='m-2 flex-col'>
            <div className='p-1'>
              <button
                className='w-full text-left'
                onClick={() => {
                  console.log('설정 클릭');
                  setIsOpen(false);
                }}
              >
                설정
              </button>
            </div>
            <div className='p-1'>
              <button
                className='w-full text-left'
                onClick={() => {
                  console.log('삭제하기 클릭');
                  setIsOpen(false);
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardButtonDropDown;
