import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'info' | 'confirm';

type AlertState = {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
  isLoading: boolean;
  confirmText: string;
  openAlert: (
    type: AlertType,
    title: string,
    message?: string,
    promiseResult?: (value: boolean) => void,
    confirmText?: string
  ) => void;
  closeAlert: () => void;
  promiseResolve?: (value: boolean) => void;
  loadingStart: () => void;
  loadingEnd: () => void;
};

/**
 * @isOpen  - 알람이 열려 있는지 여부
 * @type 알람 타입 (success, error, info, confirm)
 * @title 알람 제목
 * @message 알람 메세지 내용
 * @openAlert 알람 열기 위해 실행하는 함수 : (type, title, message)
 * @closeAlert 알람 닫기 위해 실행하는 함수
 */
export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  type: 'info',
  title: '',
  message: '',
  confirmText: '확인',
  promiseResolve: undefined,
  isLoading: false,

  openAlert: (type, title, message = '', promiseResult, confirmText = '확인') =>
    set({
      isOpen: true,
      type,
      title,
      message,
      isLoading: false,
      promiseResolve: promiseResult,
      confirmText,
    }),

  closeAlert: () =>
    set({
      isOpen: false,
      promiseResolve: undefined,
      isLoading: false,
      confirmText: '확인',
    }),

  loadingStart: () => set({ isLoading: true }),

  loadingEnd: () => set({ isLoading: false }),
}));
