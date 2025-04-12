import { TodoType } from '../types/realtime-type';
import { useTodoDataQuery } from '../hooks/use-mandalart-data-query';

type TodoProps = {
  todo: TodoType;
};

/**
 * todo tanstack query key 등록용 컴포넌트
 * @param todo - 개별 투두 데이터
 * @returns
 */
const RegisterTodo = ({ todo }: TodoProps) => {
  useTodoDataQuery(todo ?? '', todo.id);
  return null;
};

export default RegisterTodo;
