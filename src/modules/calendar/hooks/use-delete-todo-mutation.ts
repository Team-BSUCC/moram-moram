import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodoData } from '../services/edit-todo-data';

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodoData,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['my-mandalarts'] }),
  });
};
