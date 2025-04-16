'use client';
import { useState } from 'react';

const GuestMandalartCell = () => {
  const [value, setValue] = useState<string>('');
  return (
    <textarea
      className='overflow-hidden rounded-md border border-none bg-transparent p-2 text-center outline-none'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default GuestMandalartCell;
