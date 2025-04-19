'use client';

import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { ReactNode, useRef, useLayoutEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type FloatingSheetProps = {
  children: ReactNode;
};

/**
 * FloatingSheet 공통 컴포넌트 - 드래그 가능한 플로팅 패널을 제공합니다
 * @param children - 플로팅 시트 내부에 표시될 콘텐츠
 * @returns - 드래그 가능한 플로팅 패널 요소
 */
const FloatingSheet = ({ children }: FloatingSheetProps) => {
  const position = useFloatingSheetStore((state) => state.position);
  const setPosition = useFloatingSheetStore((state) => state.setPosition);
  const hide = useFloatingSheetStore((state) => state.hide);

  const nodeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // x, y가 0이면 (초기값) 중앙 좌표로 재설정
    if (position.x === 0 && position.y === 0 && nodeRef.current) {
      const w = nodeRef.current.offsetWidth;
      const h = nodeRef.current.offsetHeight;
      setPosition({
        x: (window.innerWidth - w) / 2,
        y: (window.innerHeight - h) / 2,
      });
    }
  }, [position]);

  // 드래그가 끝났을 때 위치 업데이트
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  //드래그중 일때 위치 업데이트
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div
      className='pointer-events-none fixed inset-0 z-[10] m-3'
      onClick={hide}
    >
      <Draggable
        handle='.handle' // 드래그 핸들 지정 (선택사항)
        position={position}
        nodeRef={nodeRef}
        grid={[1, 1]}
        scale={1}
        onDrag={handleDrag}
        onStop={handleDragStop}
        bounds='parent' // 부모 요소 내부로 제한 (선택사항)
      >
        <div
          ref={nodeRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='pointer-events-auto fixed z-50 overflow-scroll rounded-md bg-white-light shadow-lg'
        >
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
