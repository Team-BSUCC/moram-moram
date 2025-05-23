import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { FlatTodo } from '@/modules/today-list/types/today-list-type';

const supabase = getBrowserClient();

/**
 * todo 데이터를 DB에서 삭제하는 함수
 * @param id - 삭제할 todo 아이디
 */
export const deleteTodoData = async (id: string) => {
  const { error } = await supabase.from('cell_todos').delete().eq('id', id);

  if (error) throw new Error('Delete Todo Failed');
};

/**
 * todo의 isDone 데이터를 DB에서 업데이트하는 함수
 * @param todo - 업데이트할 todo
 */
export const updateTodoToggleData = async (todo: FlatTodo) => {
  const supabase = getBrowserClient();

  const { error } = await supabase
    .from('cell_todos')
    .update({ is_done: !todo.isDone })
    .eq('id', todo.todoId);

  if (error) throw new Error('Update Todo Failed!');
};
