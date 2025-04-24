'use client';

import MainBlock from '@/modules/mandalart/components/main-block';
import MandalartFloatingSheet from '@/modules/mandalart/components/mandalart-floating-sheet';
import SubBlock from '@/modules/mandalart/components/sub-block';
import { getCurrentUserName } from '@/shared/utils/get-current-user-name';
import { useBatchUpdateTrigger } from '@/modules/mandalart/hooks/use-batch-update-trigger';
import { useRpcMandalartDataQuery } from '@/modules/mandalart/hooks/use-mandalart-data-query';
import Spacer from '@/components/commons/spacer';
import Title from '@/components/commons/title';
import Text from '@/components/commons/text';
import { BicepsFlexed, CalendarDays } from 'lucide-react';
import LinearProgress from '@/components/commons/progress-bar';
import { calculatorProgress } from '@/shared/utils/calculator-progress';
import { User } from '@supabase/supabase-js';
import { getCurrentUserId } from '@/shared/utils/get-current-user-id';
import Button from '@/components/commons/button';
import { useRealtimeBroadCastRoom } from '../hooks/use-realtime-broadcast-room';
import AvatarStack from './mandalart-avatar-stack';
import { useClientStateStore } from '../hooks/use-client-state-store';
import { formatDate } from '@/modules/dashboard/util/format-date';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';
import { useEffect, useRef } from 'react';
import { RealtimeCursors } from './realtime-cursors';
import { toPng } from 'html-to-image';
import { useBroadcastStore } from '../hooks/use-broadcast-store';
import {
  errorAlert,
  infoAlert,
  successAlert,
} from '@/shared/utils/sweet-alert';
import * as Sentry from '@sentry/nextjs';

type MandalartMainContentProps = {
  user: User | null;
  mandalartId: string;
};

const MandalartMainContent = ({
  user,
  mandalartId,
}: MandalartMainContentProps) => {
  const isVisible = useTodoFloatingSheetStore((state) => state.isVisible);
  const hide = useTodoFloatingSheetStore((state) => state.hide);

  const boardRef = useRef<HTMLDivElement>(null);

  useRealtimeBroadCastRoom(`broadcast-room ${mandalartId}`);
  useBatchUpdateTrigger();
  const batchUpdateSupabase = useBroadcastStore(
    (state) => state.batchUpdateSupabase
  );

  const downLoadRef = useRef<HTMLDivElement>(null);

  const initialize = useClientStateStore((state) => state.initialize);
  const { data, isPending, isError } = useRpcMandalartDataQuery(mandalartId);

  useEffect(() => {
    if (isPending) return;
    if (isError) return;
    initialize(data);
  }, [data]);

  const username = getCurrentUserName(user);
  const userId = getCurrentUserId(user);

  const handleDownload = async () => {
    if (downLoadRef.current === null) return;

    try {
      const dataUrl = await toPng(downLoadRef.current);
      const link = document.createElement('a');
      link.download = `${data?.core.title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart');
        scope.setTag('feature', 'Img Download Error');
        Sentry.captureException(new Error(`[Img Download Error] ${error}`));
      });
    }
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>error</div>;
  return (
    <div
      className='flex flex-col items-center'
      onClick={() => {
        if (isVisible) {
          hide();
        }
      }}
    >
      <Spacer size='top' />
      <div className='w-full max-w-[1440px] px-4'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <Title as='h1' size='32px-medium' textColor='black'>
              {data.core.title}
            </Title>
            <AvatarStack user={user} roomName={`avatar-room ${mandalartId}`} />
          </div>
          <Spacer size='md' />
          <div className='flex'>
            <CalendarDays />
            <Text>{`${formatDate(data.core.startDate)} ~ ${formatDate(data.core.endDate)}`}</Text>
          </div>
          <Spacer size='sm' />
          <div className='flex'>
            <BicepsFlexed />
            <Text>{data.core.subTitle}</Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center md:w-[1088px]'>
        <div ref={downLoadRef} className='bg-white-light px-8'>
          <Spacer size='lg' />
          <LinearProgress value={calculatorProgress(data.core.doneCount)} />
          <Spacer size='lg' />
          <div
            className='grid w-fit animate-fadeInOnce grid-cols-3 grid-rows-3 gap-2 text-ss md:gap-5 md:text-md'
            ref={boardRef}
          >
            {/* 중앙 블록 */}
            <MainBlock />

            {/* 나머지 블록 */}
            {data.topics.map((item, idx) => {
              return <SubBlock key={item.id} topic={item} index={idx} />;
            })}
          </div>
          <Spacer size='3xl' />
        </div>
        <div className='flex gap-8'>
          <Button
            onClick={() => {
              batchUpdateSupabase().then((isSuccess) => {
                if (isSuccess) {
                  successAlert('저장 되었습니다.');
                }
                if (isSuccess === false) {
                  errorAlert('저장에 실패했습니다.');
                }
                if (isSuccess === null) {
                  infoAlert('변경된 값이 없습니다.');
                }
              });
            }}
          >
            저장하기
          </Button>
          <Button variant='secondary' onClick={handleDownload}>
            이미지로 저장하기
          </Button>
        </div>
        <Spacer size='3xl' />
      </div>
      {/* 플로팅 시트 */}
      {isVisible && <MandalartFloatingSheet />}
      <RealtimeCursors
        roomName={`cursor-room ${mandalartId}`}
        username={username}
        userId={userId}
        boardRef={boardRef}
      />
    </div>
  );
};

export default MandalartMainContent;
