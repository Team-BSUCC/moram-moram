'use client';

import { useGuestTopicStore } from '../hooks/use-guest-topic-store';
import GuestMandalartCell from './guest-mandalart-cell';

type GuestMandalartBlockProps = {
  index: number;
  topicColor: string[];
};

const cellBaseStyle =
  'relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border p-2';

const GuestMandalartBlock = ({
  index,
  topicColor,
}: GuestMandalartBlockProps) => {
  const value = useGuestTopicStore((state) => state.topics[index]);
  const setValue = useGuestTopicStore((state) => state.setTopic);
  return (
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <div
        className={`${topicColor[index]} relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-2 p-2`}
      >
        <textarea
          className={`${topicColor[8]} h-4/5 w-4/5 rounded-md border-none p-2 text-center outline-none`}
          value={value}
          onChange={(e) => {
            setValue(index, e.target.value);
          }}
        />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={cellBaseStyle}>
          <GuestMandalartCell key={index} textBg='bg-transparent' />
        </div>
      ))}
    </div>
  );
};

export default GuestMandalartBlock;
