import { TodoType } from '../type/todo-type';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

export const updateTodoToggleData = async (todo: TodoType) => {
  const supabase = getBrowserClient();

  const { error } = await supabase
    .from('cell_todos')
    .update({ is_done: !todo.isDone })
    .eq('id', todo.id);

  if (error) throw new Error('Update Failed!');
};
