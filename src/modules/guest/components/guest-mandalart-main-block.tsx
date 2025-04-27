'use client';

import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import { useGuestTopicStore } from '../hooks/use-guest-topic-store';
import { ChangeEvent, useEffect, useRef } from 'react';
import GuestMandalartMainCell from './guest-mandalart-main-cell';

type GuestMainBlock = {
  coreColor: string;
};

const GuestMandalartMainBlock = ({ coreColor }: GuestMainBlock) => {
  const coreValue = useGuestTopicStore((state) => state.core);
  const setCoreValue = useGuestTopicStore((state) => state.setCore);
  const coreRef = useRef<HTMLTextAreaElement>(null);
  const MIN_LINE_HEIGHT = 24;

  const active = !coreValue;

  useEffect(() => {
    const el = coreRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const newHeight = Math.max(el.scrollHeight, MIN_LINE_HEIGHT);
    el.style.height = `${newHeight}px`;
  }, [coreValue]);

  const charLimit = 15;
  const handleInputValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length - 1 === charLimit) return;
    setCoreValue(e.target.value);
  };

  return (
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <div
        className={`${coreColor} relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden break-keep rounded-lg border-[3px] border-main p-2`}
      >
        <textarea
          ref={coreRef}
          className='text-16px mt-1 min-h-[24px] w-full max-w-md resize-none overflow-hidden bg-transparent text-center font-semibold leading-[1.5] outline-none placeholder:text-sub'
          value={coreValue}
          onChange={handleInputValueChange}
          maxLength={15}
          placeholder='핵심주제'
          rows={1}
        />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`${!active ? getColorWithNumber(index) : 'bg-lightgray'} relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border border-assist p-2 text-sub transition-all`}
        >
          <GuestMandalartMainCell index={index} active={active} />
        </div>
      ))}
    </div>
  );
};

export default GuestMandalartMainBlock;
