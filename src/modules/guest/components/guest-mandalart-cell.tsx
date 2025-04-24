'use client';
import { useEffect, useRef, useState } from 'react';

const GuestMandalartCell = ({ active }: { active: boolean }) => {
  const [value, setValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MIN_LINE_HEIGHT = 24;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const newHeight = Math.max(el.scrollHeight, MIN_LINE_HEIGHT);
    el.style.height = `${newHeight}px`;
  }, [value]);

  return (
    <textarea
      disabled={active}
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='text-16px mt-1 min-h-[24px] w-full max-w-md resize-none overflow-hidden break-keep bg-transparent text-center font-regular leading-[1.5] outline-none placeholder:text-caption'
      placeholder='실행 방안'
      rows={1}
    />
  );
};

export default GuestMandalartCell;
