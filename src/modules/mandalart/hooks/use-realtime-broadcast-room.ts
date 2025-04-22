import { useQueryClient } from '@tanstack/react-query';
import { useBroadcastStore } from './use-broadcast-store';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { TodoPayloadType } from '../types/realtime-type';
import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useRealtimeBroadCastRoom = (roomName: string) => {
  //TODO 룸네임받는 훅으로 수정

  const addBroadcastStore = useBroadcastStore(
    (state) => state.addBroadcastStore
  );
  const supabase = getBrowserClient();
  const queryClient = useQueryClient();

  const [broadcastChannel, setBroadCastChannel] = useState<RealtimeChannel>();

  useEffect(() => {
    const channel = supabase.channel(roomName);
    channel
      .on('broadcast', { event: 'shout' }, (payload) => {
        addBroadcastStore(payload.payload);
        //투두일때
        if ('action' in payload.payload) {
          if (payload.payload.action === 'UPDATE') {
            queryClient.setQueryData(
              QUERY_KEY.todolist(payload.payload.cell_id),
              (todoList: TodoPayloadType[]) => {
                return todoList.map((item) =>
                  item.id === payload.payload.id ? payload.payload : item
                );
              }
            );

            queryClient.setQueryData(
              QUERY_KEY.todo(payload.payload.id),
              payload.payload
            );
            return;
          }

          if (payload.payload.action === 'CREATE') {
            queryClient.setQueryData(
              QUERY_KEY.todolist(payload.payload.cell_id),
              (todoList: TodoPayloadType[]) => {
                return [...todoList, payload.payload];
              }
            );
            return;
          }

          if (payload.payload.action === 'DELETE') {
            queryClient.setQueryData(
              QUERY_KEY.todolist(payload.payload.cell_id),
              (todoList: TodoPayloadType[]) => {
                return todoList.filter(
                  (item) => item.id !== payload.payload.id
                );
              }
            );
            return;
          }
        }

        queryClient.setQueryData(
          [payload.payload.category, payload.payload.id],
          payload.payload.value
        );
      })
      .subscribe();

    setBroadCastChannel(channel);
  }, []);

  return broadcastChannel;
};
