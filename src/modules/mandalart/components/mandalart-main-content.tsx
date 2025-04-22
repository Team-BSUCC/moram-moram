'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import { RealtimeCursors } from '@/modules/mandalart/components/realtime-cursors';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { getCurrentUserName } from '@/shared/utils/get-current-user-name';
import { useBatchUpdateTrigger } from '@/modules/mandalart/hooks/use-batch-update-trigger';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createTodoListkey } from '@/modules/mandalart/services/create-todo-list-key';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';
import Text from '@/components/commons/text';
import { BicepsFlexed, CalendarDays } from 'lucide-react';
import LinearProgress from '@/components/commons/progress-bar';
import { calculatorProgress } from '@/shared/utils/calculator-progress';
import { User } from '@supabase/supabase-js';
import { useRealtimePresenceRoom } from '../hooks/use-realtime-presence-room';
import { AvatarStack } from './mandalart-avatar-stack';
import { useUsersStore } from '../hooks/use-users-store';
import { getCurrentUserId } from '@/shared/utils/get-current-user-id';
import Button from '@/components/commons/button';
import { useRealtimeBroadCastRoom } from '../hooks/use-realtime-broadcast-room';

/**
 * Memo: useCurrentUserName 훅으로 닉네임을 가져와서
 * RealtimeAvatarStack과 RealtimeCursors에 props로 전달하면 됩니다.
 */

type MandalartMainContentProps = {
  user: User | null;
  mandalartId: string;
};

const MandalartMainContent = ({
  user,
  mandalartId,
}: MandalartMainContentProps) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useMandalartDataQuery(mandalartId);

  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const currentUsers = useUsersStore((state) => state.currentUsers);

  useRealtimePresenceRoom(`avatar-room ${mandalartId}`, user);
  const broadcastChannel = useRealtimeBroadCastRoom(
    `broadcastChannel ${mandalartId}`
  );
  useBatchUpdateTrigger();

  useEffect(() => {
    if (isPending) return;
    createTodoListkey(queryClient, data);
  }, [isPending, data, queryClient]);

  if (isPending || !broadcastChannel) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  const username = getCurrentUserName(user);
  const userId = getCurrentUserId(user);

  console.log('랜더링테스트');

  return (
    <div className='flex flex-col items-center'>
      <Spacer size='top' />
      <RealtimeCursors
        roomName='cursor-room'
        username={username}
        userId={userId}
      />

      <div className='w-full max-w-[1440px] px-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <Title as='h1' size='32px-medium' textColor='black'>
              2025년 성장의 해로 만들기
            </Title>
            <AvatarStack avatars={currentUsers} user={user} />
          </div>
          <Spacer size='md' />
          <div className='flex'>
            <CalendarDays />
            <Text>365일 남음</Text>
          </div>
          <Spacer size='sm' />
          <div className='flex'>
            <BicepsFlexed />
            <Text>이번년도 반드시 이루고 말거야 !</Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center md:w-[1024px]'>
        <Spacer size='lg' />
        <LinearProgress value={calculatorProgress(data.done_count)} />
        <Spacer size='lg' />
        <div className='grid w-fit grid-cols-3 grid-rows-3 gap-2 text-ss md:gap-5 md:text-md'>
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
        <Spacer size='3xl' />
        <div className='flex gap-8'>
          <Button>만다라트 작성법 보기</Button>
          <Button variant='secondary'>이미지로 저장하기</Button>
        </div>
        <Spacer size='3xl' />
      </div>
    </div>
  );
};

export default MandalartMainContent;
