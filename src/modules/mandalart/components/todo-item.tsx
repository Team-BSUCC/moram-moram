import CheckBox from '@/components/commons/check-box';
import { useTodoCacheQuery } from '../hooks/use-mandalart-data-query';
import { useMemo, useState } from 'react';
import { TodoPayloadType, TodoType } from '../types/realtime-type';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/query-key';
import Input from '@/components/commons/input';
import RoundButton from '@/components/commons/round-button';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useTodoBroadcastMutation } from '../hooks/use-todo-broadcast-mutation';
import { useThrottleMutate } from '../hooks/use-throttle-mutate';
import Spacer from '@/components/commons/spacer';
import Dropdown from '@/components/commons/drop-down';
import Button from '@/components/commons/button';
import Text from '@/components/commons/text';

type TodoItemProps = {
  id: string;
  cellId: TodoType;
  channelReceiver: RealtimeChannel;
};

const TodoItem = ({ id, cellId, channelReceiver }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const [valuePayload, setValuePayload] = useState<string>('');

  const { data: todo } = useTodoCacheQuery(id);
  const todoRow = (todo ?? {}) as TodoPayloadType;

  const getInitialValue = () => todoRow.value || todoRow.title || '';
  const [value, setValue] = useState<string>(getInitialValue());
  const memoValue = useMemo(
    () => setValuePayload(todoRow.value),
    [todoRow.value]
  );

  const [done, setDone] = useState<boolean>(todoRow.is_done ?? false);
  const memoIsDone = useMemo(
    () => setDone(todoRow.is_done ?? false),
    [todoRow.is_done]
  );

  const { mutate } = useTodoBroadcastMutation(
    channelReceiver,
    cellId as TodoPayloadType
  );
  const throttledMutate = useThrottleMutate(mutate, 300);
  const deleteMutate = useThrottleMutate(mutate, 50);

  return (
    /* eslint-disable indent */ //삼항연산자오류때문에 작성했습니다 해당 규칙에대해 논의 필요합니다.
    <>
      <Spacer size='sm' />
      <div className='flex items-center justify-between gap-3'>
        <CheckBox
          sizes='lg'
          checked={done}
          onChange={() => {
            const newDone = done;
            setDone(!newDone);
            queryClient.setQueryData(
              QUERY_KEY.todo(id),
              (entry: TodoPayloadType) => {
                queryClient.setQueryData(
                  QUERY_KEY.todolist(cellId.cell_id),
                  (todoList: TodoPayloadType[]) =>
                    todoList.map((todo) =>
                      todo.id === id
                        ? {
                            ...todo,
                            is_done: !newDone,
                            action: 'UPDATE',
                            category: 'TODO',
                          }
                        : todo
                    )
                );
                return { ...entry, is_done: !newDone };
              }
            );
            throttledMutate();
          }}
        />
        <Input
          variant='outline'
          sizes='20px-regular'
          value={valuePayload || value}
          placeholder='TODO를 작성해주세요.'
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);
            queryClient.setQueryData(
              QUERY_KEY.todo(id),
              (entry: TodoPayloadType) => {
                queryClient.setQueryData(
                  QUERY_KEY.todolist(cellId.cell_id),
                  (todoList: TodoPayloadType[]) =>
                    todoList.map((todo) =>
                      todo.id === id
                        ? {
                            ...todo,
                            action: 'UPDATE',
                            category: 'TODO',
                            value: newValue,
                          }
                        : todo
                    )
                );
                return { ...entry, action: 'UPDATE', value: newValue };
              }
            );
            throttledMutate();
          }}
        />
        <Dropdown>
          <Button variant='none'>뭐들어가야하지</Button>
          <Button
            variant='none'
            onClick={() => {
              queryClient.setQueryData(
                QUERY_KEY.todolist(cellId.cell_id),
                (todoList: TodoPayloadType[]) =>
                  todoList.map((todo) =>
                    todo.id === id
                      ? { ...todo, action: 'DELETE', category: 'TODO' }
                      : todo
                  )
              );
              deleteMutate();
            }}
          >
            삭제하기
          </Button>
        </Dropdown>
      </div>
      <Spacer size='sm' />
      <div className='pl-12'>
        <Text size='16px-regular' textColor='sub'>
          2025.3.15 &gt;
        </Text>
      </div>
      <Spacer size='sm' />
    </>
  );
};

export default TodoItem;
