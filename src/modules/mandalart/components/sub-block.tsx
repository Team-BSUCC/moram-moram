import Cell from './cell';

type Props = {
  title: string;
  topic: any;
  subTopics: any;
};

const SubBlock = ({ title, topic, subTopics }: Props) => {
  const gridCells = Array(9).fill(null);

  const { mandalart_subtopics, ...topicWithoutSubtopics } = topic;

  gridCells[4] = {
    content: title,
    isCenter: true,
    ...topicWithoutSubtopics,
  };

  // 나머지 셀에 서브토픽 배치
  subTopics.forEach((subTopic: any, idx: number) => {
    // 중앙 위치는 건너뛰기
    const index = idx >= 4 ? idx + 1 : idx;

    gridCells[index] = {
      isCenter: false,
      ...subTopic,
    };
  });

  return (
    <div className='grid grid-cols-3 grid-rows-3 gap-2'>
      {gridCells.map((cell, idx) => (
        <Cell
          key={cell?.id || idx}
          id={cell.id}
          value={cell?.content || ''}
          className={cell?.isCenter ? 'bg-gray-100 border-2 font-bold' : ''}
        />
      ))}
    </div>
  );
};

export default SubBlock;
