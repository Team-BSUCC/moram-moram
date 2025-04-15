'use client';
import { useState } from 'react';

const GuestMandalartCell = () => {
  const [value, setValue] = useState<string>('');
  return (
    <textarea
      className={`h-4/5 w-4/5 rounded-md border border-none bg-transparent p-2 text-center outline-none`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default GuestMandalartCell;
