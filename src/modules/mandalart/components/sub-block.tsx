import Cell from './cell';

type Props = {
  title: string;
  subTopics: Array<{
    id: string;
    topic: string;
    todos?: any[];
  }>;
};

const SubBlock = ({ title, subTopics }: Props) => {
  const gridCells = Array(9).fill(null);

  // 중앙(인덱스 4)에 타이틀 배치
  gridCells[4] = { content: title, isCenter: true };

  // 나머지 셀에 서브토픽 배치
  subTopics.forEach((subTopic, idx) => {
    const index = idx >= 4 ? idx + 1 : idx;

    // 중앙 위치는 건너뛰기
    if (index !== 4) {
      gridCells[index] = {
        content: subTopic.topic,
        isCenter: false,
        id: subTopic.id,
      };
    }
  });

  return (
    <div className='grid grid-cols-3 grid-rows-3 gap-2'>
      {gridCells.map((cell, idx) => (
        <Cell
          key={cell?.id || idx}
          value={cell?.content || ''}
          className={cell?.isCenter ? 'bg-gray-100 font-bold' : ''}
        />
      ))}
    </div>
  );
};

export default SubBlock;
