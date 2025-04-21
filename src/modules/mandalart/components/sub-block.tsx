import { useMemo } from 'react';
import Cell from './cell';
import { SubTopicType, TopicType } from '../types/realtime-type';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';

type SubBlockProps = {
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
const SubBlock = ({ title, topic, subTopics }: SubBlockProps) => {
  // props로 객체를 넘겨주기 위한 메모이제이션
  const memoizedCells = useMemo(() => {
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
    // 서브블럭 스타일 지정
    <div className='grid aspect-square grid-cols-3 grid-rows-3 gap-2'>
      {memoizedCells.map((cell, idx) => {
        let cellColor = '';
        if (idx === 4) cellColor = getColorWithNumber(cell.topic_index);
        return (
          <Cell
            key={cell?.id || idx}
            info={cell}
            value={cell?.content || ''}
            className={
              cell?.isCenter && `border-[3px] border-black ${cellColor}`
            }
          />
        );
      })}
    </div>
  );
};

export default SubBlock;
