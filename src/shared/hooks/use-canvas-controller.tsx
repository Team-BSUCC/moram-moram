'use client';

import { useEffect, useRef, useState } from 'react';
import panzoom from 'panzoom';

type EarlyStateType = {
  x: number;
  y: number;
  scale: number;
};

const DESKTOP_SIZE = 1024;

export const usePanzoomController = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<ReturnType<typeof panzoom> | null>(null);

  const [earlyState, setEarlyState] = useState<EarlyStateType>({
    x: 0,
    y: 0,
    scale: 1,
  });

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < DESKTOP_SIZE;

  const lastCenter = useRef<{ x: number; y: number } | null>(null);
  const initialDistance = useRef<number>(0);
  const initialScale = useRef<number>(1);

  useEffect(() => {
    if (!gridRef.current || !isMobile) return;

    const grid = gridRef.current;

    const availableWidth = window.innerWidth * 0.9;
    const gridWidth = 888;
    const initial = availableWidth / gridWidth;
    const finalScale = Math.min(initial, 1);

    const rect = grid.getBoundingClientRect();

    const instance = panzoom(grid, {
      maxZoom: 1,
      minZoom: 0.425,
      smoothScroll: false,
      zoomDoubleClickSpeed: 1,
      zoomSpeed: 0.065,
      bounds: true,
      boundsPadding: 0,
    });

    panzoomRef.current = instance;
    instance.smoothZoomAbs(rect.width / 2, rect.height / 2, finalScale);
    instance.pause();

    const calculatedState = instance.getTransform();
    setEarlyState({
      x: calculatedState.x,
      y: calculatedState.y,
      scale: calculatedState.scale,
    });

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        lastCenter.current = { x: midX, y: midY };

        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance.current = Math.hypot(dx, dy);

        initialScale.current = panzoomRef.current?.getTransform().scale ?? 1;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && lastCenter.current) {
        e.preventDefault();

        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        const dx = midX - lastCenter.current.x;
        const dy = midY - lastCenter.current.y;

        // 이동 처리
        panzoomRef.current?.moveBy(dx, dy, false);

        // 확대/축소 처리
        const distX = e.touches[0].clientX - e.touches[1].clientX;
        const distY = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(distX, distY);

        const scaleFactor = currentDistance / initialDistance.current;
        const newScale = initialScale.current * scaleFactor;
        const clampedScale = Math.max(0.425, Math.min(1, newScale));

        const rect = grid.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        panzoomRef.current?.zoomAbs(centerX, centerY, clampedScale);

        lastCenter.current = { x: midX, y: midY };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        lastCenter.current = null;
      }
    };

    grid.addEventListener('touchstart', handleTouchStart, { passive: false });
    grid.addEventListener('touchmove', handleTouchMove, { passive: false });
    grid.addEventListener('touchend', handleTouchEnd);

    return () => {
      instance.dispose();
      grid.removeEventListener('touchstart', handleTouchStart);
      grid.removeEventListener('touchmove', handleTouchMove);
      grid.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, gridRef.current?.clientWidth]);

  const resetCanvas = async () => {
    if (!panzoomRef.current || !gridRef.current) return;
    panzoomRef.current.moveTo(earlyState.x, earlyState.y);
    panzoomRef.current.zoomAbs(0, 0, earlyState.scale);
    panzoomRef.current.smoothMoveTo(earlyState.x, earlyState.y);
    panzoomRef.current.smoothZoomAbs(0, 0, earlyState.scale);
  };

  return {
    gridRef,
    panzoomRef,
    resetCanvas,
  };
};
