import { TodoPayloadType } from '../types/realtime-type';

export const createNewTodoRowValue = (subtopicId: string): TodoPayloadType => {
  return {
    id: crypto.randomUUID(),
    cell_id: subtopicId,
    created_at: new Date().toISOString(),
    is_done: false,
    title: '새 TODO',
    action: 'CREATE',
    value: '새 TODO',
    category: 'TODO',
  };
};
