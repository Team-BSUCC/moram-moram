'use client';

import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import { useGuestTopicStore } from '../hooks/use-guest-topic-store';
import GuestMandalartCell from './guest-mandalart-cell';
import { ChangeEvent, useEffect, useRef } from 'react';
import { delayWithIndex } from '../util/delay-with-index';

type GuestMandalartBlockProps = {
  index: number;
};

const GuestMandalartBlock = ({ index }: GuestMandalartBlockProps) => {
  const coreValue = useGuestTopicStore((state) => state.core);
  const value = useGuestTopicStore((state) => state.topics[index]);
  const setValue = useGuestTopicStore((state) => state.setTopic);
  const topicRef = useRef<HTMLTextAreaElement>(null);
  const MIN_LINE_HEIGHT = 24;

  const active = !coreValue;

  const activeSub = !value;

  useEffect(() => {
    const el = topicRef.current;
    if (!el) return;

    el.style.height = 'auto'; // 초기화
    const newHeight = Math.max(el.scrollHeight, MIN_LINE_HEIGHT);
    el.style.height = `${newHeight}px`; // 최소 높이 보장
  }, [value]);

  const charLimit = 15;
  const handleInputValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length - 1 === charLimit) return;
    setValue(index, e.target.value);
  };

  return (
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <div
        className={`${!active ? getColorWithNumber(index) : 'bg-gray-lightgray'} relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-[3px] border-main p-2 transition-all delay-100 duration-500`}
      >
        <textarea
          disabled={active}
          maxLength={15}
          ref={topicRef}
          className='text-16px mt-1 min-h-[24px] w-full max-w-md resize-none overflow-hidden break-keep bg-transparent text-center font-semibold leading-[1.5] outline-none placeholder:text-sub'
          value={value}
          onChange={handleInputValueChange}
          placeholder='대주제'
          rows={1}
        />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`${!activeSub ? 'bg-white-light' : 'bg-gray-lightgray'} ${delayWithIndex(index)} relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border border-caption p-2 transition-all duration-500`}
        >
          <GuestMandalartCell key={index} active={activeSub} />
        </div>
      ))}
    </div>
  );
};

export default GuestMandalartBlock;
