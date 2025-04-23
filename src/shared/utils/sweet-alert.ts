import Swal from 'sweetalert2';

const confirmButtonColor = 'var(--color-beige)';

export const successAlert = (title: string, message = '') => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    heightAuto: false,
    confirmButtonColor,
  });
};

export const errorAlert = (title: string, message = '') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    heightAuto: false,
    confirmButtonColor,
  });
};

export const infoAlert = (title: string, message = '') => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    heightAuto: false,
    confirmButtonColor,
  });
};
