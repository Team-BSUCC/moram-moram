import { useMemo } from 'react';
import Cell from './cell';

type Props = {
  title: string;
  topics: any;
  info: any;
  className: string;
};

const MainBlock = ({ title, topics, info, className }: Props) => {
  const memoizedCells = useMemo(() => {
    const cells = Array(9).fill(null);
    cells[4] = { ...info };

    topics.forEach((topic: any, idx: number) => {
      const pos = idx >= 4 ? idx + 1 : idx;
      cells[pos] = { isCenter: false, ...topic };
    });

    return cells;
  }, [topics, title, info]);

  return (
    <div className={className}>
      <div className='grid grid-cols-3 grid-rows-3 gap-2'>
        {memoizedCells.map((cell, idx) => (
          <Cell
            key={idx}
            id={cell.id}
            info={cell}
            value={cell?.topic || cell?.title || ''}
            className={cell?.isCenter ? 'border-2' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBlock;
