'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState, useEffect, ReactNode } from 'react';

type DropdownProps = {
  children: ReactNode;
  selection?: boolean;
};

/**
 * 드롭다운 공통 컴포넌트
 * @param children - 내부에 필요한 요소를 넣어주시면 됩니다. (button)
 * @param selection - v, ^ 형식으로 UI가 필요한 경우 selection을 추가로 기재해주면 됩니다.
 * @returns
 */
const Dropdown = ({ children, selection = false }: DropdownProps) => {
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
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        <button>
          {selection ? isOpen ? <ChevronUp /> : <ChevronDown /> : '⋮'}
        </button>
      </div>

      {isOpen && (
        /**
         * @todo 색상 코드 하드코딩 수정하기
         */
        <div className='absolute right-0 z-10 mt-2 w-32 rounded-lg border-[1px] border-[#e6e6e6] bg-white-light p-2 shadow-md'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
