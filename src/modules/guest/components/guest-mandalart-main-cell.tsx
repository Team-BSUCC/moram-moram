'use client';
import { useEffect, useRef } from 'react';
import { useGuestTopicStore } from '../hooks/use-guest-topic-store';

type GuestMandalartMainCellProps = {
  index: number;
  active: boolean;
};

const GuestMandalartMainCell = ({
  index,
  active,
}: GuestMandalartMainCellProps) => {
  const value = useGuestTopicStore((state) => state.topics);
  const setValue = useGuestTopicStore((state) => state.setTopic);
  const topicRef = useRef<HTMLTextAreaElement>(null);
  const MIN_LINE_HEIGHT = 24;

  useEffect(() => {
    const el = topicRef.current;
    if (!el) return;

    el.style.height = 'auto';
    const newHeight = Math.max(el.scrollHeight, MIN_LINE_HEIGHT);
    el.style.height = `${newHeight}px`;
  }, [value]);

  return (
    <textarea
      disabled={active}
      ref={topicRef}
      className='text-16px mt-1 min-h-[24px] w-full max-w-md resize-none overflow-hidden break-keep bg-transparent text-center font-semibold leading-[1.5] outline-none placeholder:text-sub'
      value={value[index]}
      onChange={(e) => setValue(index, e.target.value)}
      placeholder='대주제'
      rows={1}
    />
  );
};

export default GuestMandalartMainCell;
