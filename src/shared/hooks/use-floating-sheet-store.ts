import { create } from 'zustand';

type FloatingSheetState = {
  isVisible: boolean; // 온오프 상태
  position: { x: number; y: number }; // 위치 좌표
  id: string;

  show: () => void; // 시트 보이기
  hide: () => void; // 시트 숨기기
  // eslint-disable-next-line no-unused-vars
  setPosition: (position: { x: number; y: number }) => void; // 위치 설정)
  // eslint-disable-next-line no-unused-vars
  setId: (id: string) => void;
};

const useFloatingSheetStore = create<FloatingSheetState>((set) => ({
  //화면의 on,off(마운트, 언마운트) 제어 state
  isVisible: false,
  //floating sheet의 위치를 저장하는 state
  position: { x: 0, y: 0 },
  id: '',

  // 액션 구현
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
  setPosition: (position) => set({ position }),
  setId: (id) => set({ id }),
}));

export default useFloatingSheetStore;
