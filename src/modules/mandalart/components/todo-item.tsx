import CheckBox from '@/components/commons/check-box';
import { useEffect, useMemo, useState } from 'react';
import { CellTodo, DateRangeState } from '../types/realtime-type';
import Input from '@/components/commons/input';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import Spacer from '@/components/commons/spacer';
import Dropdown from '@/components/commons/drop-down';
import Button from '@/components/commons/button';
import Text from '@/components/commons/text';
import { useChannelStore } from '../hooks/use-channel-store';
import { formatDate } from '@/shared/utils/format-date';
import { useThrottleMutateWithTrailing } from '../hooks/use-arg-throttle-mutate';
import TodoDateSelector from './todo-date-selector';
import { useClientStateStore } from '../hooks/use-client-state-store';

type TodoItemProps = {
  todo: CellTodo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const channel = useChannelStore((state) => state.channel);
  const thisTodo = useClientStateStore((state) =>
    state.getTodoItem(`${todo.cellId}-${todo.id}`)
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<DateRangeState>({
    year: '',
    month: '',
    day: '',
  });

  const getInitialValue = thisTodo?.title || '';
  const [value, setValue] = useState<string>(getInitialValue);
  const changeTodo = useMemo(
    () => setValue(thisTodo?.title ?? ''),
    [thisTodo?.title]
  );

  const [done, setDone] = useState<boolean>(thisTodo?.isDone ?? false);
  const changeDone = useMemo(
    () => setDone(thisTodo?.isDone ?? false),
    [thisTodo?.isDone]
  );

  const { mutate: mutationTodo } = useTodoBroadcastMutation(channel);
  const throttleMutate = useThrottleMutateWithTrailing(
    mutationTodo,
    0.5 * 1000
  );

  const handleMutateDate = () => {
    if (Object.values(date).every((value) => value !== '')) {
      throttleMutate({
        value: {
          ...todo,
          scheduledDate: `${date.year}-${date.month}-${date.day}`,
        },
        action: 'UPDATE',
      });
    }
  };

  return (
    /* eslint-disable indent */ //삼항연산자오류때문에 작성했습니다 해당 규칙에대해 논의 필요합니다.
    <div>
      <Spacer size='sm' />
      <div className='flex items-center justify-between gap-3'>
        <CheckBox
          sizes='lg'
          checked={done}
          onChange={() => {
            const newDone = done;
            setDone(!newDone);
            throttleMutate({
              value: { ...todo, isDone: !newDone },
              action: 'UPDATE',
            });
          }}
        />
        <Input
          variant='outline'
          sizes='20px-regular'
          value={value || thisTodo?.title}
          placeholder='TODO를 작성해주세요.'
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);
            throttleMutate({
              value: { ...todo, title: newValue },
              action: 'UPDATE',
            });
          }}
        />
        <Dropdown>
          <Button
            variant='none'
            onClick={() => {
              throttleMutate({
                value: todo,
                action: 'DELETE',
              });
            }}
          >
            삭제하기
          </Button>
        </Dropdown>
      </div>
      <Spacer size='xs' />
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className='cursor-pointer pl-12'
      >
        <div className='flex place-items-center justify-start'>
          <Text size='16px-medium' textColor='sub'>
            {todo.scheduledDate
              ? formatDate(todo.scheduledDate)
              : '날짜가 필요합니다!'}
          </Text>
          <TodoDateSelector
            onChange={handleMutateDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleDate={setDate}
            date={date}
          />
        </div>
      </div>
      <Spacer size='sm' />
    </div>
  );
};

export default TodoItem;
