import { create } from 'zustand';

type FloatingSheetState = {
  // 상태 (데이터)
  isVisible: boolean; // 온오프 상태
  position: { x: number; y: number }; // 위치 좌표

  show: () => void; // 시트 보이기
  hide: () => void; // 시트 숨기기
  setPosition: (position: { x: number; y: number }) => void; // 위치 설정)
};

// Zustand 스토어 생성
const useFloatingSheetStore = create<FloatingSheetState>((set) => ({
  // 초기 상태
  isVisible: false,
  position: { x: 0, y: 0 },

  // 액션 구현
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
  setPosition: (position) => set({ position }),
}));

export default useFloatingSheetStore;
