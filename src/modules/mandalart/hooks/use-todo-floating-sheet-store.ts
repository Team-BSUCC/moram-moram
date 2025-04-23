import { MandalartFloatingSheetInfo } from '@/modules/mandalart/types/realtime-type';
import { create } from 'zustand';

type TodoFloatingSheetState = {
  isVisible: boolean; // 온오프 상태
  position: { x: number; y: number }; // 위치 좌표
  info: MandalartFloatingSheetInfo | null; // sheet 정보

  show: () => void; // 시트 보이기
  hide: () => void; // 시트 숨기기
  setPosition: (position: { x: number; y: number }) => void; // 위치 설정
  setInfo: (info: MandalartFloatingSheetInfo | null) => void;
};

const useTodoFloatingSheetStore = create<TodoFloatingSheetState>((set) => ({
  //화면의 on,off(마운트, 언마운트) 제어 state
  isVisible: false,
  //floating sheet의 위치를 저장하는 state
  position: { x: 0, y: 0 },
  info: null,

  // 액션 구현
  show: () => set({ isVisible: true }),
  hide: () => set({ info: null, isVisible: false }),
  setPosition: (position) => set({ position }),
  setInfo: (info) => set({ info }),
}));

export default useTodoFloatingSheetStore;
