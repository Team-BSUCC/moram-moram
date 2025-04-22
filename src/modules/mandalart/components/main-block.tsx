import { useMemo } from 'react';
import Cell from './cell';
import { MandalartType, TopicsType, TopicType } from '../types/realtime-type';
import { getColorWithNumber } from '@/shared/utils/get-color-with-number';

/**
 * 메인 블록 컴포넌트(핵심주제 + 대주제)
 * @param info - 처음 join된 상태의 모든 데이터
 * @returns
 */
const MainBlock = ({ topics, info }) => {
  // props로 객체를 내려주기 위한 메모이제이션
  const memoizedCells = useMemo(() => {
    const cells = Array(9).fill(null);
    // 중앙 셀 구분
    cells[4] = { ...info };

    topics.forEach((topic: TopicType, idx: number) => {
      // 중앙 셀은 건너뛰고 인덱스 지정
      const pos = idx >= 4 ? idx + 1 : idx;
      cells[pos] = { isCenter: false, ...topic };
    });

    return cells;
  }, [topics, info]);

  return (
    <div className='col-start-2 row-start-2 grid h-full grid-cols-3 grid-rows-3 gap-2'>
      {memoizedCells.map((cell, idx) => {
        //중앙 블럭의 대주제 스타일
        let cellStyle =
          idx < 4 ? getColorWithNumber(idx) : getColorWithNumber(idx - 1);
        //코어주제 스타일
        if (idx === 4)
          cellStyle = 'bg-violet-pigment border-black border-[3px]';
        return (
          <Cell
            key={idx}
            info={cell}
            value={cell?.topic || cell?.title || ''}
            className={cellStyle}
          />
        );
      })}
    </div>
  );
};

export default MainBlock;
