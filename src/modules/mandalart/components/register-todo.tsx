import { TodoType } from '../types/realtime-type';
import { useTodoDataQuery } from '../hooks/use-mandalart-data-query';

const RegisterTodo = ({ todo }: { todo: TodoType }) => {
  useTodoDataQuery(todo.title ?? '', todo.id);
  return null;
};

export default RegisterTodo;
