import { useMutation } from '@tanstack/react-query';
import { updateTodoToggleData } from '../services/edit-todo-data';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import Swal from 'sweetalert2';

export const useUpdateTodoMutation = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return useMutation({
    mutationFn: updateTodoToggleData,
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'Calendar Page');
        scope.setTag('feature', 'update Todo');

        Sentry.captureException(
          new Error(
            `[updateTodo] ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        );
      });
      Swal.fire({
        icon: 'error',
        title: '업데이트에 실패했습니다. 다시 시도해주세요!',
      });
    },
  });
};
