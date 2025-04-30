import { useAlertStore } from '../hooks/use-alert-store';

const getAlertStore = () => useAlertStore.getState();

export const successAlert = (title: string, message = '') => {
  getAlertStore().openAlert('success', title, message);
};

export const errorAlert = (title: string, message = '') => {
  getAlertStore().openAlert('error', title, message);
};

export const infoAlert = (title: string, message = '') => {
  getAlertStore().openAlert('info', title, message);
};

export const confirmAlert = (title: string, message = ''): Promise<boolean> => {
  return new Promise((resolve) => {
    getAlertStore().openAlert('confirm', title, message, resolve);
  });
};
