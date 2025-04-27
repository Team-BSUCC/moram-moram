'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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

  const charLimit = 15;
  const handleInputValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length - 1 === charLimit) return;
    setValue(e.target.value);
  };

  return (
    <textarea
      disabled={active}
      ref={textareaRef}
      maxLength={15}
      value={value}
      onChange={handleInputValueChange}
      className='text-16px mt-1 min-h-[24px] w-full max-w-md resize-none overflow-hidden break-keep bg-transparent text-center font-regular leading-[1.5] outline-none placeholder:text-caption'
      placeholder='실행 방안'
      rows={1}
    />
  );
};

export default GuestMandalartCell;
