import { create } from 'zustand';

type BottomSheetStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useBottomSheetStore;
