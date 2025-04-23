import { useMutation } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTodoData } from '../services/edit-todo-data';
import * as Sentry from '@sentry/nextjs';
import { errorAlert } from '@/shared/utils/sweet-alert';

export const useDeleteTodoMutation = () => {
  const [_, startTransition] = useTransition();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteTodoData,
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
    },
    onError: (error) => {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'TodayList & Calendar Page');
        scope.setTag('feature', 'deleteTodo');

        Sentry.captureException(
          new Error(
            `[deleteTodo] ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        );
      });
      errorAlert('삭제를 실패했습니다. 다시 시도해주세요!');
    },
  });
};
