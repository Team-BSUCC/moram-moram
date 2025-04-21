import { useMutation } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTodoData } from '../services/edit-todo-data';

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
  });
};
