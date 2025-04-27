import { useEffect } from 'react';

/**
 * esc 키를 눌렀을 때 실행할 함수를 등록하는 커스텀 훅
 * @param onEscape - esc 키를 눌렀을 때 동작하고 싶은 함수
 */
export const useEscapeKey = (onEscape: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape]);
};
