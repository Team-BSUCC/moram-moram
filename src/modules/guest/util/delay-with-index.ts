export const delayWithIndex = (index: number): string => {
  const idx = index % 8;
  const delay: Record<number, string> = {
    0: 'delay-0',
    1: 'delay-[50ms]',
    2: 'delay-[100ms]',
    3: 'delay-[350ms]',
    4: 'delay-[150ms]',
    5: 'delay-[300ms]',
    6: 'delay-[250ms]',
    7: 'delay-[200ms]',
  };

  return delay[idx];
};
