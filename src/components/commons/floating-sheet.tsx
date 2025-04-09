'use client';

import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { ReactNode } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type FloatingSheetProps = { children: ReactNode };

/**
 * FloatingSheet 공통 컴포넌트 - 드래그 가능한 플로팅 패널을 제공합니다
 * @param children - 플로팅 시트 내부에 표시될 콘텐츠
 * @returns - 드래그 가능한 플로팅 패널 요소
 */
const FloatingSheet = ({ children }: FloatingSheetProps) => {
  const position = useFloatingSheetStore((state) => state.position);
  const setPosition = useFloatingSheetStore((state) => state.setPosition);
  const hide = useFloatingSheetStore((state) => state.hide);

  // 드래그가 끝났을 때 위치 업데이트
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };
  //드래그중 일때 위치 업데이트
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div className='fixed h-dvh w-dvw' onClick={hide}>
      <Draggable
        handle='.handle' // 드래그 핸들 지정 (선택사항)
        position={position}
        grid={[1, 1]}
        scale={1}
        onDrag={handleDrag}
        onStop={handleDragStop}
        bounds='parent' // 부모 요소 내부로 제한 (선택사항)
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='fixed z-50 rounded-lg border bg-white p-4 shadow-lg'
        >
          {/* 드래그 핸들 */}
          <div className='flex justify-end'>
            <button onClick={hide}>...X...</button>
          </div>
          <div className='handle mb-2 flex h-6 cursor-pointer items-center justify-center rounded bg-gray'>
            <div className='bg-gray-300 h-1 w-10 rounded-full'></div>
          </div>

          {/* 시트 안에 들어갈 내용 드래그 중 텍스트 선택 방지 */}
          <div className='select-none'>
            <div>{children}</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default FloatingSheet;
