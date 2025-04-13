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
import { throttleMutate } from '../services/throttle-mutate';

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
  const throttledMutate = useMemo(() => throttleMutate(mutate, 300), [mutate]);
  const deleteMutate = useMemo(() => throttleMutate(mutate, 50), [mutate]);

  return (
    <div className='flex items-center'>
      <CheckBox
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
                      ? { ...todo, is_done: !newDone, action: 'UPDATE' }
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
                      ? { ...todo, action: 'UPDATE', value: newValue }
                      : todo
                  )
              );
              return { ...entry, action: 'UPDATE', value: newValue };
            }
          );
          throttledMutate();
        }}
      />
      <RoundButton
        size='xs'
        onClick={() => {
          queryClient.setQueryData(
            QUERY_KEY.todolist(cellId.cell_id),
            (todoList: TodoPayloadType[]) =>
              todoList.map((todo) =>
                todo.id === id ? { ...todo, action: 'DELETE' } : todo
              )
          );
          deleteMutate();
        }}
      >
        X
      </RoundButton>
    </div>
  );
};

export default TodoItem;
