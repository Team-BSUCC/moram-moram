'use client';

import React, { ReactNode, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type FloatingSheetProps = { children: ReactNode };

const FloatingSheet = ({ children }: FloatingSheetProps) => {
  // 초기 위치 상태 관리 (선택사항)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 드래그가 끝났을 때 위치 업데이트
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div className='h-dvh w-dvw'>
      <Draggable
        handle='.handle' // 드래그 핸들 지정 (선택사항)
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        grid={[1, 1]}
        scale={1}
        onStop={handleDragStop}
        bounds='parent' // 부모 요소 내부로 제한 (선택사항)
      >
        <div className='fixed z-50 rounded-lg border bg-white p-4 shadow-lg'>
          {/* 드래그 핸들 */}
          <div className='handle mb-2 flex h-6 cursor-pointer items-center justify-center rounded bg-gray-100'>
            <div className='h-1 w-10 rounded-full bg-gray-300'></div>
          </div>

          {/* 시트 안에 들어갈 내용 드래그 중 텍스트 선택 방지 */}
          <div className='select-none'>
            <h3 className='mb-2 font-bold'>플로팅 패널</h3>
            <p>이 패널을 드래그하여 이동할 수 있습니다.</p>
            <div>{children}</div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default FloatingSheet;
