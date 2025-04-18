import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

export const deleteTodoData = async (id: string) => {
  const supabase = getBrowserClient();

  const { error } = await supabase.from('cell_todos').delete().eq('id', id);

  if (error) throw new Error('Delete Failed');
};
