import { CellTodo } from '../types/realtime-type';
import { getTodayDateYYYYMMDD } from './get-today-yyyy-mm-dd';

export const createNewTodoRowValue = (subtopicId: string): CellTodo => {
  return {
    id: crypto.randomUUID(),
    cellId: subtopicId,
    createdAt: new Date().toISOString(),
    isDone: false,
    title: '',
    scheduledDate: getTodayDateYYYYMMDD(),
  };
};
