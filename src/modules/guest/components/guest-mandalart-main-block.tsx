'use client';

import { useGuestTopicStore } from '../hooks/use-guest-topic-store';

type GuestMainBlock = {
  coreColor: string;
  topicColor: string[];
};

const GuestMandalartMainBlock = ({ coreColor, topicColor }: GuestMainBlock) => {
  const coreValue = useGuestTopicStore((state) => state.core);
  const setCoreaValue = useGuestTopicStore((state) => state.setCore);
  const value = useGuestTopicStore((state) => state.topics);
  const setValue = useGuestTopicStore((state) => state.setTopic);
  return (
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      <div
        className={`${coreColor} relative col-start-2 row-start-2 flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border-2 p-2`}
      >
        <textarea
          className={`${topicColor[8]} h-4/5 w-4/5 rounded-md border-none p-2 text-center outline-none`}
          value={coreValue}
          onChange={(e) => {
            setCoreaValue(e.target.value);
          }}
        />
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`${topicColor[index]} relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border p-2`}
        >
          <textarea
            className={`${topicColor[8]} h-4/5 w-4/5 rounded-md border-none p-2 text-center outline-none`}
            value={value[index]}
            onChange={(e) => setValue(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default GuestMandalartMainBlock;
