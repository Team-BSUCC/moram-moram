import { useMutation } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTodoData } from '../services/edit-todo-data';
import Swal from 'sweetalert2';

export const useDeleteTodoMutation = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteTodoData,
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: '삭제를 실패했습니다. 다시 시도해주세요!',
      });
    },
  });
};
