import FloatingSheet from '@/components/commons/floating-sheet';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { TodoListType } from '../type/todo-type';

/**
 * @todo : floating sheet UI 수정
 * @todo : 들어갈 내용 추가하기
 * @todo : DB 데이터 연동
 * @todo : 어떤식으로 데이터를 가져올지 고민하기
 */
type CalendarProps = {
  todos: TodoListType;
};
const CalendarFloatingSheet = ({ todos }: CalendarProps) => {
  const info = useFloatingSheetStore((state) => state.info as string);

  // event 중 클릭한 날짜에 해당하는 todo만 필터링
  const todayTodo = todos.filter((todo) => todo.date === info);
  return (
    <FloatingSheet>
      <Text>{info}</Text>
      <Title as='h1'>TO DO LIST</Title>
      <div>
        {todayTodo.map((todo, idx) => (
          <div key={idx}>{todo.title}</div>
        ))}
      </div>
    </FloatingSheet>
  );
};

export default CalendarFloatingSheet;
