/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'info' | 'confirm';

type AlertState = {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  openAlert: (
    type: AlertType,
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => void;
  closeAlert: () => void;
};

/**
 * @isOpen  - 알람이 열려 있는지 여부
 * @type 알람 타입 (success, error, info, confirm)
 * @title 알람 제목
 * @message 알람 메세지 내용
 * @onConfirm 확인버튼 누르면 실행되는 콜백 함수
 * @onCancel 취소버튼 누르면 실행되는 콜백 함수
 * @openAlert 알람 열기 위해 실행하는 함수 : (type, title, message, onConfirm, onCancel)
 * @closeAlert 알람 닫기 위해 실행하는 함수
 */
export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  type: 'info',
  title: '',
  message: '',
  onConfirm: undefined,
  onCancel: undefined,
  openAlert: (type, title, message = '', onConfirm, onCancel) =>
    set({ isOpen: true, type, title, message, onConfirm, onCancel }),
  closeAlert: () => set({ isOpen: false }),
}));
