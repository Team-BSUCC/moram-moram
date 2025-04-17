import Button from '@/components/commons/button';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import RegisterTodo from './register-todo';
import { CellInfoType, TodoPayloadType } from '../types/realtime-type';
import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '../services/get-data-category';
import {
  useCellCacheQuery,
  useTodoListCacheQuery,
} from '../hooks/use-mandalart-data-query';

type CellProps = {
  value: string;
  className?: string;
  info: CellInfoType;
};

/**
 * 셀 컴포넌트
 * @param value - UI에 표시될 값
 * @param className - 스타일(중앙 셀 구분을 위한)
 * @param info - 셀에 대한 모든 DB 컬럼 정보
 * @returns
 */
const Cell = ({ value, className, info }: CellProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // tanstack query key에 셀 정보 저장하는 로직
    queryClient.setQueryData(getQueryKey(info), value);
  }, [queryClient, info, value]);

  // 캐시된 데이터를 받아오는 로직
  const { data } = useCellCacheQuery(info);

  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const { data: todoList } = useTodoListCacheQuery(info.id);
  const todoListCacheArray = (todoList ?? []) as TodoPayloadType[];

  // 플로팅 시트를 띄우는 이벤트 핸들러
  const handleClick = () => {
    setInfo(info);
    show();
  };

  return (
    <>
      <Button onClick={handleClick} variant='outline'>
        {/* 셀의 스타일 지정 */}
        <div
          className={`relative flex aspect-square max-w-full items-center justify-center overflow-hidden rounded-lg border p-2 ${className}`}
          style={{ borderRadius: '8px' }}
        >
          {data}
        </div>
      </Button>

      {/* Todo key 등록을 위한 등록 컴포넌트 */}
      {'cell_todos' in info &&
        todoListCacheArray.map((todo, idx) => {
          return <RegisterTodo key={idx} todo={todo} />;
        })}
    </>
  );
};

export default React.memo(Cell);
