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
import { useEffect, useState } from 'react';
import { RealtimeCursors } from './realtime-cursors';
import { useBroadcastStore } from '../hooks/use-broadcast-store';
import {
  errorAlert,
  infoAlert,
  successAlert,
} from '@/shared/utils/sweet-alert';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { usePanzoomController } from '@/shared/hooks/use-canvas-controller';
import {
  useDownloadMandalartInCanvas,
  useDownloadMandalartWithOutCanvas,
} from '../hooks/use-download-realtime-mandalart';
import UserNavigation from './user-navigation';
import InstructionModal from './instruction-modal';

const DESKTOP_SIZE = 1024;

type MandalartMainContentProps = {
  user: User | null;
  mandalartId: string;
};

const MandalartMainContent = ({
  user,
  mandalartId,
}: MandalartMainContentProps) => {
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const hide = useFloatingSheetStore((state) => state.hide);

  useRealtimeBroadCastRoom(`broadcast-room ${mandalartId}`);
  useBatchUpdateTrigger();
  const batchUpdateSupabase = useBroadcastStore(
    (state) => state.batchUpdateSupabase
  );

  const initialize = useClientStateStore((state) => state.initialize);
  const subTopics = useClientStateStore((state) => state.subTopics);
  const subtopicDoneList = Array.from(subTopics).filter(
    ([_, subtopicValue]) => subtopicValue.isDone
  );

  const { data, isPending, isError } = useRpcMandalartDataQuery(mandalartId);

  const { gridRef, panzoomRef, resetCanvas } = usePanzoomController();

  useEffect(() => {
    if (isPending) return;
    if (isError) return;
    initialize(data);
  }, [data]);

  const username = getCurrentUserName(user);
  const userId = getCurrentUserId(user);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const screenResize = () => {
      if (window.innerWidth >= DESKTOP_SIZE) {
        setIsDesktop(true);
      }

      if (window.innerWidth < DESKTOP_SIZE) {
        setIsDesktop(false);
      }
    };

    if (window.innerWidth >= DESKTOP_SIZE) {
      setIsDesktop(true);
    }

    window.addEventListener('resize', screenResize);
    return () => window.removeEventListener('resize', screenResize);
  }, []);

  const { handleDownloadCanvas } = useDownloadMandalartInCanvas(
    gridRef,
    panzoomRef,
    data?.core.title
  );

  const { handleDownload } = useDownloadMandalartWithOutCanvas(
    gridRef,
    data?.core.title
  );

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
          <div className='gap- flex'>
            <BicepsFlexed />
            <Text>{data.core.subTitle || '반드시 완수한다'}</Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        {isDesktop ? (
          <div className='flex flex-col items-center bg-white-light px-8 md:w-[1088px]'>
            <Spacer size='lg' />
            <LinearProgress
              value={calculatorProgress(subtopicDoneList.length)}
            />
            <Spacer size='lg' />
            <div
              className='grid w-fit animate-fadeInOnce grid-cols-3 grid-rows-3 gap-2 text-ss md:gap-5 md:text-md'
              ref={gridRef}
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
        ) : (
          <div className='bg-white-light'>
            <Spacer size='md' />
            <div className='px-8'>
              <LinearProgress
                value={calculatorProgress(subtopicDoneList.length)}
              />
            </div>
            <Spacer size='md' />
            <div className='relative flex h-[100dvw] w-screen flex-1 items-center justify-center overflow-hidden bg-transparent'>
              <div className='absolute bottom-3 right-3 z-10 items-center rounded-full bg-[rgba(0,0,0,0.3)]'>
                <button
                  className='p-2 text-md text-white'
                  onClick={resetCanvas}
                >
                  초기화
                </button>
              </div>
              <div className='pointer-events-none absolute inset-0 z-10 overflow-hidden shadow-[inset_0px_0px_20px_0px_rgba(0,0,0,0.3)]' />
              <div
                className='z-0 grid min-w-[888px] animate-fadeInOnce grid-cols-3 grid-rows-3 gap-5 text-md'
                ref={gridRef}
                style={{ touchAction: 'none' }}
              >
                {/* 중앙 블록 */}
                <MainBlock />

                {/* 나머지 블록 */}
                {data.topics.map((item, idx) => {
                  return <SubBlock key={item.id} topic={item} index={idx} />;
                })}
              </div>
            </div>
            <Spacer size='3xl' />
          </div>
        )}

        <div className='flex gap-8'>
          <Button
            onClick={() => {
              if (window.innerWidth >= 1024) {
                return setIsModalOpen(true);
              }
              setIsSheetOpen(true);
            }}
            variant='default'
            size='medium'
          >
            작성법 보기
          </Button>
          <Button
            disabled={isDownloading}
            variant='secondary'
            onClick={async () => {
              setIsDownloading(true);
              if (panzoomRef === null) return handleDownload(setIsDownloading);
              handleDownloadCanvas(setIsDownloading);
            }}
          >
            {isDownloading ? '이미지 저장중...' : '이미지 저장하기'}
          </Button>
        </div>
        <Spacer size='3xl' />
      </div>
      <InstructionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
      <UserNavigation
        isNavigationOpen={isNavigationOpen}
        setIsNavigationOpen={setIsNavigationOpen}
      />
      {/* 플로팅 시트 */}
      {isVisible && <MandalartFloatingSheet />}
      {isDesktop && (
        <RealtimeCursors
          roomName={`cursor-room ${mandalartId}`}
          username={username}
          userId={userId}
          boardRef={gridRef}
        />
      )}
    </div>
  );
};

export default MandalartMainContent;
