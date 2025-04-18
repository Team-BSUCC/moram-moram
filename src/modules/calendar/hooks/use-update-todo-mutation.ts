import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodoToggleData } from '../services/edit-todo-data';

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodoToggleData,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['my-mandalarts'] }),
  });
};
