import Button from '@/components/commons/button';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import RegisterTodo from './register-todo';
import { ExtendedCellInfo } from '../types/realtime-type';
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '../services/get-data-category';
import { useCellCacheQuery } from '../hooks/use-mandalart-data-query';

type Props = {
  value: string;
  className?: string;
  info: ExtendedCellInfo;
};

/**
 * 셀 컴포넌트
 * @param value - UI에 표시될 값
 * @param className - 스타일(중앙 셀 구분을 위한)
 * @param info - 셀에 대한 모든 DB 컬럼 정보
 * @returns
 */
const Cell = ({ value, className, info }: Props) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    // tanstack query key에 셀 정보 저장하는 로직
    queryClient.setQueryData(getQueryKey(info), value);
  }, [queryClient, info, value]);

  // 캐시된 데이터를 받아오는 로직
  const { data } = useCellCacheQuery(info);

  const setShowInfo = useFloatingSheetStore((state) => state.setShowInfo);

  // 플로팅 시트를 띄우는 이벤트 핸들러
  const handleClick = () => {
    setShowInfo(info);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <div
          className={`border-gray-200 flex h-20 w-20 items-center justify-center border text-center text-xs ${className || ''}`}
          style={{ borderRadius: '8px' }}
        >
          {data}
        </div>
      </Button>
      {/* Todo key 등록을 위한 등록 컴포넌트 */}
      {info.cell_todos?.map((todo, idx) => {
        return <RegisterTodo key={idx} todo={todo} />;
      })}
    </>
  );
};

export default React.memo(Cell);
