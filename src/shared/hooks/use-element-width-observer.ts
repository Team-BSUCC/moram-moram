import { useCallback, useRef, useState } from 'react';

export const useElementWidthObserver = () => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      setWidth(node.getBoundingClientRect().width);

      observerRef.current = new ResizeObserver(([entry]) => {
        const newWidth = entry.contentRect.width;
        setWidth((prev) => (prev !== newWidth ? newWidth : prev));
      });

      observerRef.current.observe(node);
    }
  }, []);

  return { ref, width };
};
