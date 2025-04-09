import { create } from 'zustand';

type FloatingSheetState = {
  isVisible: boolean; // 온오프 상태
  position: { x: number; y: number }; // 위치 좌표
  showInfo: any | null;

  show: () => void; // 시트 보이기
  hide: () => void; // 시트 숨기기
  // eslint-disable-next-line no-unused-vars
  setPosition: (position: { x: number; y: number }) => void; // 위치 설정)
  // eslint-disable-next-line no-unused-vars
  setShowInfo: (info: any) => void;
};

const useFloatingSheetStore = create<FloatingSheetState>((set) => ({
  //화면의 on,off(마운트, 언마운트) 제어 state
  isVisible: false,
  //floating sheet의 위치를 저장하는 state
  position: { x: 0, y: 0 },
  showInfo: null,

  // 액션 구현
  show: () => set({ isVisible: true }),
  hide: () => set({ showInfo: null }),
  setPosition: (position) => set({ position }),
  setShowInfo: (info) => set({ showInfo: info }),
}));

export default useFloatingSheetStore;
