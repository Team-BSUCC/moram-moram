import { useCallback, useState } from 'react';

type HistoryState = {
  past: string[];
  present: string;
  future: string[];
};

const MAX_HISTORY_LENGTH = 10;

// 문자열은 불변성이 보장되므로 deepClone이 사실 필요없지만,
// 추후 추가 할 컴포넌트 정보가 객체로 넘어오므로 미리 추가
const deepClone = (value: string): string => {
  return JSON.parse(JSON.stringify(value));
};

// prev와 next 상태의 문자열의 단어 개수를 비교하여 합칠 수 있는지 판단하는 함수
// 즉 글자 하나하나를 단어로 만드는 대에 꼭 필요한 함수!
const isMergeable = (prev: string, next: string): boolean => {
  const prevWords = prev.trim().split(/\s+/).filter(Boolean);
  const nextWords = next.trim().split(/\s+/).filter(Boolean);
  return prevWords.length === nextWords.length;
};

export const useHistory = (initialPresent: string) => {
  const [state, setState] = useState<HistoryState>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const undo = useCallback(() => {
    setState((current) => {
      const { past, present, future } = current;
      if (past.length === 0) return current;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((current) => {
      const { past, present, future } = current;
      if (future.length === 0) return current;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: string) => {
    setState((current) => {
      const { past, present } = current;
      // 동일한 상태이면 기록하지 않습니다.
      if (newPresent === present) return current;
      // mergeable 조건: 단어 수가 동일하면 기록 대신 현재 상태만 업데이트
      if (isMergeable(present, newPresent)) {
        return { ...current, present: newPresent };
      }
      // 새로운 기록을 추가할 때 deepClone 사용 (문자열은 사실 필요없지만 일단 사용)
      const newPast = [...past, deepClone(present)];
      // 최대 기록 길이를 초과하면 가장 오래된 기록 제거
      if (newPast.length > MAX_HISTORY_LENGTH) {
        newPast.shift();
      }
      return {
        past: newPast,
        present: newPresent,
        future: [], // 새로운 상태가 들어오면 redo 기록은 초기화
      };
    });
  }, []);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  return { state: state.present, set, undo, redo, canUndo, canRedo };
};
