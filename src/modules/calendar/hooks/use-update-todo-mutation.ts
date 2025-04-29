import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodoToggleData } from '../services/edit-todo-data';
import * as Sentry from '@sentry/nextjs';
import { errorAlert } from '@/shared/utils/sweet-alert';

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoToggleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMandalarts'] });
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
      errorAlert('업데이트에 실패했습니다. 다시 시도해주세요!');
    },
  });
};
