import Cell from './cell';

type Props = {
  title: string;
  topics: any;
  id: string;
  className: string;
};

const MainBlock = ({ title, topics, id, className }: Props) => {
  const gridCells = Array(9).fill(null);

  // 중앙(인덱스 4)에 타이틀 배치
  gridCells[4] = { topic: title, isCenter: true, id: id };

  topics.forEach((topic: any, idx: number) => {
    // 중앙 위치는 건너뛰기
    const pos = idx >= 4 ? idx + 1 : idx;
    gridCells[pos] = { isCenter: false, ...topic };
  });

  return (
    <div className={className}>
      <div className='grid grid-cols-3 grid-rows-3 gap-2'>
        {gridCells.map((cell, idx) => (
          <Cell
            key={idx}
            id={cell.id}
            value={cell?.topic || ''}
            className={cell?.isCenter ? 'border-2' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBlock;
