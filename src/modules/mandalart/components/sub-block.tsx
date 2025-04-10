import { useMemo } from 'react';
import Cell from './cell';
import { SubTopicType, TopicType } from '../types/realtime-type';

type Props = {
  title: string;
  topic: TopicType;
  subTopics: SubTopicType[];
};

/**
 * 중앙 블록을 제외한 서브 블록 컴포넌트
 * @param title - 중앙 셀 제목
 * @param topic - 대주제
 * @param subTopics - 소주제 배열
 * @returns
 */
const SubBlock = ({ title, topic, subTopics }: Props) => {
  // props로 객체를 넘겨주기 위한 메모이제이션
  const MemoizedCells = useMemo(() => {
    const gridCells = Array(9).fill(null);

    gridCells[4] = {
      content: title,
      isCenter: true,
      ...topic,
    };

    // 나머지 셀에 서브토픽 배치
    subTopics.forEach((subTopic: SubTopicType, idx: number) => {
      // 중앙 위치는 건너뛰기
      const index = idx >= 4 ? idx + 1 : idx;

      gridCells[index] = {
        isCenter: false,
        ...subTopic,
      };
    });
    return gridCells;
  }, [title, topic, subTopics]);

  return (
    <div className='grid grid-cols-3 grid-rows-3 gap-2'>
      {MemoizedCells.map((cell, idx) => (
        <Cell
          key={cell?.id || idx}
          info={cell}
          value={cell?.content || ''}
          className={cell?.isCenter ? 'bg-gray-100 border-2 font-bold' : ''}
        />
      ))}
    </div>
  );
};

export default SubBlock;
