'use client';

import { getColorWithNumber } from '@/shared/utils/get-color-with-number';
import { useGuestTopicStore } from '../hooks/use-guest-topic-store';
import GuestMandalartCell from './guest-mandalart-cell';

type GuestMandalartBlockProps = {
  index: number;
};

const GuestMandalartBlock = ({ index }: GuestMandalartBlockProps) => {
  const value = useGuestTopicStore((state) => state.topics[index]);
  const setValue = useGuestTopicStore((state) => state.setTopic);
  return (
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <div
        className={`${getColorWithNumber(index)} relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-2 p-2`}
      >
        <textarea
          className='overflow-hidden rounded-md border-none bg-transparent p-2 text-center outline-none'
          value={value}
          onChange={(e) => {
            setValue(index, e.target.value);
          }}
        />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border p-2'
        >
          <GuestMandalartCell key={index} />
        </div>
      ))}
    </div>
  );
};

export default GuestMandalartBlock;
