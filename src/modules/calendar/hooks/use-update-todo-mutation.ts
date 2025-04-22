import { useMutation } from '@tanstack/react-query';
import { updateTodoToggleData } from '../services/edit-todo-data';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

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
  });
};
