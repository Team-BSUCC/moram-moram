'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import { RealtimeAvatarStack } from '@/modules/mandalart/components/realtime-avatar-stack';
import { RealtimeCursors } from '@/modules/mandalart/components/realtime-cursors';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { useCurrentUserName } from '@/modules/mandalart/hooks/use-current-user-name';
import { useBatchUpdateTrigger } from '@/modules/mandalart/hooks/use-batch-update-trigger';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import { useRealtimeUserSync } from '@/modules/mandalart/hooks/use-realtime-user-sync';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUserId } from '@/modules/mandalart/hooks/use-current-user-id';
import { useEffect } from 'react';
import { createTodoListkey } from '@/modules/mandalart/services/create-todo-list-key';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { TodoPayloadType } from '@/modules/mandalart/types/realtime-type';

/**
 * Memo: useCurrentUserName 훅으로 닉네임을 가져와서
 * RealtimeAvatarStack과 RealtimeCursors에 props로 전달하면 됩니다.
 */
const MandalartPage = () => {
  // floating sheet가 열렸는지 닫혔는지 판별하는 변수
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const username = useCurrentUserName();
  const { userId, isReady } = useCurrentUserId();

  // const [user, setUser] = useState<User | null>();
  const supabase = getBrowserClient();
  const queryClient = useQueryClient();
  /**
   * Memo: 동적 값으로 수정 예정
   */
  const { data, isPending, isError } = useMandalartDataQuery(
    '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'
  );

  useEffect(() => {
    if (isPending) return;

    createTodoListkey(queryClient, data);
  }, [isPending, data, queryClient]);

  const broadcastChannel = supabase.channel('broadcastChannel');

  useBatchUpdateTrigger();
  broadcastChannel
    .on('broadcast', { event: 'shout' }, (payload) => {
      if ('action' in payload.payload) {
        if (payload.payload.action === 'UPDATE') {
          queryClient.setQueryData(
            QUERY_KEY.todolist(payload.payload.cell_id),
            (todoList: TodoPayloadType[]) => {
              console.log(todoList);
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
              return todoList.filter((item) => item.id !== payload.payload.id);
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

  useRealtimeUserSync(broadcastChannel);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  return (
    <div>
      {isReady && (
        <RealtimeCursors
          roomName='cursor-room'
          username={username}
          userId={userId}
        />
      )}

      <div className='flex justify-end'>
        <RealtimeAvatarStack roomName='avatar-room' username={username} />
      </div>
      <div className='grid w-fit grid-cols-3 grid-rows-3 gap-5 text-xs'>
        {/* 중앙 블록 */}
        <MainBlock
          topics={data.mandalart_topics}
          info={data}
          className='col-start-2 row-start-2 h-full'
        />
        {/* 나머지 블록 */}
        {data.mandalart_topics.map((topic) => {
          return (
            <SubBlock
              key={topic.id}
              title={topic.topic}
              topic={topic}
              subTopics={topic.mandalart_subtopics}
            />
          );
        })}
        {/* 플로팅 시트 */}
        {isVisible && (
          <MandalartFloatingSheet channelReceiver={broadcastChannel} />
        )}
      </div>
    </div>
  );
};

export default MandalartPage;
