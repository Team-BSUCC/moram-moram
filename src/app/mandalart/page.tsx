'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import { RealtimeAvatarStack } from '@/modules/mandalart/components/realtime-avatar-stack';
import { RealtimeCursors } from '@/modules/mandalart/components/realtime-cursors';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { useMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import { useRealtimeUserSync } from '@/modules/mandalart/hooks/use-realtime-user-sync';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const MandalartPage = () => {
  // floating sheet가 열렸는지 닫혔는지 판별하는 변수
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const [user, setUser] = useState<User | null>();
  const supabase = getBrowserClient();
  const queryClient = useQueryClient();
  /**
   * Memo: 동적 값으로 수정 예정
   */
  const { data, isPending, isError } = useMandalartDataQuery(
    '6424de9b-7fbf-470a-9743-c9bb5e3cdad8'
  );

  const testChannel = supabase.channel('testChannel');

  testChannel
    .on('broadcast', { event: 'shout' }, (payload) => {
      queryClient.setQueryData(
        [payload.payload.category, payload.payload.id],
        payload.payload.value
      );
    })
    .subscribe();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUserData();
  }, []);
  useRealtimeUserSync(testChannel);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>error</div>;

  return (
    <div>
      {user && (
        <RealtimeCursors
          roomName='cursor-room'
          username={user?.user_metadata.nickname}
          userId={user.id}
        />
      )}
      <div className='flex justify-end'>
        <RealtimeAvatarStack roomName='avatar-room' />
      </div>
      <div className='grid w-fit grid-cols-3 grid-rows-3 gap-5 text-xs'>
        {/* 중앙 블록 */}
        <MainBlock topics={data.mandalart_topics} info={data} />
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
        {isVisible && <MandalartFloatingSheet channelReceiver={testChannel} />}
      </div>
    </div>
  );
};

export default MandalartPage;
