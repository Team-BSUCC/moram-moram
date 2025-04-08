import Cell from './cell';

type Props = {
  title: string;
  topics: any;
  className: string;
};

const MainBlock = ({ title, topics, className }: Props) => {
  // 3x3 그리드를 위한 9개의 셀 배열 생성
  const gridCells = Array(9).fill(null);

  // 중앙(인덱스 4)에 타이틀 배치
  gridCells[4] = { topic: title, isCenter: true };

  // 나머지 셀에 토픽 배치 (최대 8개)
  topics.forEach((topic: any, idx: number) => {
    // 중앙 위치는 건너뛰기
    const pos = idx >= 4 ? idx + 1 : idx;
    gridCells[pos] = { topic: topic.topic, isCenter: false };
  });

  return (
    <div className={className}>
      <div className='grid grid-cols-3 grid-rows-3 gap-2'>
        {gridCells.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell?.topic || ''}
            className={cell?.isCenter ? 'bg-blue-100' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBlock;
