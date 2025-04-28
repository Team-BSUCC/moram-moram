'use client';

import { ReactNode, useRef, useLayoutEffect, useState, useEffect } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';

type FloatingSheetProps = {
  children: ReactNode;
  hideOnOutsideClick?: boolean;
};

/**
 * FloatingSheet 공통 컴포넌트
 *
 * @param children - 플로팅 시트 내부에 표시될 콘텐츠
 * @param hideOnOutsideClick - true로 지정시 바깥영역을 클릭하면 닫힘
 * @returns
 */
const FloatingSheet = ({
  children,
  hideOnOutsideClick,
}: FloatingSheetProps) => {
  const position = useFloatingSheetStore((state) => state.position);
  const setPosition = useFloatingSheetStore((state) => state.setPosition);
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const hide = useFloatingSheetStore((state) => state.hide);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  // 모바일 환경
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // x, y가 0이면 (초기값) 중앙 좌표로 재설정 (데스크톱만)
  useLayoutEffect(() => {
    if (!isMobile && position.x === 0 && position.y === 0 && nodeRef.current) {
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

  // 드래그중 일때 위치 업데이트
  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  // 바깥 영역 클릭 처리
  const outSideClick = !hideOnOutsideClick && 'pointer-events-none';

  // 바텀시트 (모바일)
  if (isMobile) {
    return (
      <div className={`${outSideClick} fixed inset-0 z-50 m-3`} onClick={hide}>
        <Drawer
          open={isVisible}
          onOpenChange={(open) => !open && hide()}
          modal={false} // 뒷 배경 스크롤 불가능 여부
        >
          <DrawerContent
            className='h-[60vh] overflow-y-auto rounded-t-lg p-0'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* 화면에는 보이지 않지만 스크린 리더가 읽을 수 있도록 표시 */}
            <DrawerHeader className='sr-only'>
              <DrawerTitle>바텀시트 영역</DrawerTitle>
              <DrawerDescription>
                클릭한 요소의 정보를 확인할 수 있는 바텀시트입니다.
              </DrawerDescription>
            </DrawerHeader>
            <div>{children}</div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
  // 플로팅 시트(데스트탑)
  return (
    <div className={`${outSideClick} fixed inset-0 z-50 m-3`} onClick={hide}>
      <Draggable
        handle='.handle'
        cancel='.no-drag'
        position={position}
        nodeRef={nodeRef}
        grid={[1, 1]}
        scale={1}
        onDrag={handleDrag}
        onStop={handleDragStop}
        bounds='parent'
      >
        <div
          ref={nodeRef}
          onClick={(e) => e.stopPropagation()}
          className='pointer-events-auto fixed z-50 rounded-md bg-white-light shadow-lg'
        >
          {/* 내용 */}
          <div className='select-none'>
            <div className='mx-auto h-[50vh] w-[60vw] overflow-y-auto rounded-lg md:h-[60vh] md:w-[50vw] lg:h-[70vh] lg:max-h-[800px] lg:w-[500px]'>
              {children}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default FloatingSheet;
