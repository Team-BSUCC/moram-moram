import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { TodoListType } from '../type/todo-type';

/**
 * @todo : floating sheet UI 수정
 * @todo : 들어갈 내용 추가하기
 * @todo : DB 데이터 연동
 */
type CalendarProps = {
  todos: TodoListType;
};
const CalendarFloatingSheet = ({ todos }: CalendarProps) => {
  const info = useFloatingSheetStore((state) => state.info as string);
  return (
    <FloatingSheet>
      <Text>{info}</Text>
      <Title as='h1'>TO DO LIST</Title>
      <div>
        {todos.map((todo, idx) => (
          <div key={idx}>{todo.title}</div>
        ))}
      </div>
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
