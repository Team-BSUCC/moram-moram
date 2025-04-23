import { CellTodo } from '../types/realtime-type';

export const createNewTodoRowValue = (subtopicId: string): CellTodo => {
  return {
    id: crypto.randomUUID(),
    cellId: subtopicId,
    createdAt: new Date().toISOString(),
    isDone: false,
    title: '새 TODO',
    scheduledDate: null,
  };
};
