/* eslint-disable indent */

import Button from '@/components/commons/button';
import { useGetAiUsageCountQuery } from '../hooks/use-get-ai-usage-count-query';
import { useUsageCountMutations } from '../hooks/use-usage-count-mutations';
import { useClientStateStore } from '../hooks/use-client-state-store';
import Image from 'next/image';
import { fetchGetAiSuggestKeywords } from '../services/fetch-get-ai-suggest-keywords';
import { useChannelStore } from '../hooks/use-channel-store';
import { useCellBroadcastMutation } from '../hooks/use-cell-broadcast-mutation';
import { useAlertStore } from '@/shared/hooks/use-alert-store';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { errorAlert, infoAlert } from '@/shared/utils/sweet-alert';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import { MandalartFloatingSheetInfo } from '../types/realtime-type';

type AiSuggestButtonProps = {
  value: string;
  type: 'core' | 'topic';
};

const AiSuggestButton = ({ value, type }: AiSuggestButtonProps) => {
  const { aiUsageCount, isAiUsageCountFetching } = useGetAiUsageCountQuery();
  const { mutateAsync: usageCountPlus } = useUsageCountMutations();

  const channel = useChannelStore((state) => state.channel);
  const { mutate: mutationCell } = useCellBroadcastMutation(channel);

  const topics = useClientStateStore((state) => state.topics);
  const subTopics = useClientStateStore((state) => state.subTopics);

  const openAlert = useAlertStore((store) => store.openAlert);
  const [isAiFetching, setIsFetching] = useState<boolean>(false);

  const info = useFloatingSheetStore(
    (state) => state.info
  ) as MandalartFloatingSheetInfo;
  if (info === undefined || info === null) {
    return <div>오류</div>;
  }

  const MAX_AI_USAGE_COUNT = 30;
  const isAiLimited =
    aiUsageCount === null || aiUsageCount >= MAX_AI_USAGE_COUNT;

  const topicList = Array.from(topics.values());
  //ai api에 요청할 대주제 배열 생성
  const topicValueList = topicList
    .filter((topicValue) => topicValue.topic)
    .map((topicValue) => topicValue.topic);

  const subtopicList = Array.from(
    subTopics
      .values()
      .filter((subtopicValue) => subtopicValue.topicId === info.id)
  );
  //ai api에 요청할 소주제 배열 생성
  const subtopicValueList = subtopicList
    .filter((subtopicValue) => subtopicValue.content)
    .map((subtopicValue) => subtopicValue.content);

  //대주제들을 추천받는 핸들러
  const handleAiTopicSuggest = async () => {
    if (isAiLimited) {
      return;
    }
    const aiSuggestTopicList = await fetchGetAiSuggestKeywords(
      value,
      topicValueList as string[]
    );
    usageCountPlus();
    topicList.forEach((topicValue) => {
      if (!topicValue.topic) {
        mutationCell({
          action: 'topic',
          value: { ...topicValue, topic: aiSuggestTopicList.pop() as string },
        });
      }
    });
  };

  //소주제들을 추천받는 핸들러
  const handleAiSubTopicSuggest = async () => {
    if (isAiLimited) {
      return;
    }
    const aiSuggestTopicList = await fetchGetAiSuggestKeywords(
      value,
      subtopicValueList as string[]
    );
    usageCountPlus();
    subtopicList.forEach((subtopicValue) => {
      if (!subtopicValue.content) {
        mutationCell({
          action: 'subTopic',
          value: {
            ...subtopicValue,
            content: aiSuggestTopicList.pop() as string,
          },
        });
      }
    });
  };

  const handleSuggest = async (result: boolean) => {
    setIsFetching(true);
    try {
      if (result) {
        switch (type) {
          case 'core': {
            await handleAiTopicSuggest();
            break;
          }
          case 'topic':
            await handleAiSubTopicSuggest();
            break;
        }
      }
    } catch (error) {
      errorAlert(
        '추천 목록을 받아오는중 에러가 발생하였습니다.',
        '다시 시도 해주세요.'
      );
    }
    setIsFetching(false);
  };

  const LIMIT_GUIDE_TITLE = '사용 횟수 제한';
  const LIMIT_GUIDE_MESSAGE = (
    <>
      오늘은 더 이상 사용하실 수 없습니다.
      <br /> 내일 다시 이용해주세요
    </>
  );
  const FULL_BLOCK_MESSAGE = '해당 블럭 칸이 가득 차 있습니다.';

  const confirmText = isAiLimited
    ? `사용제한 (${aiUsageCount}/${MAX_AI_USAGE_COUNT})`
    : `추천받기 (${aiUsageCount}/${MAX_AI_USAGE_COUNT})`;

  const buttonActions = {
    core: {
      title: isAiLimited ? LIMIT_GUIDE_TITLE : '대주제 추천받기',
      message: isAiLimited
        ? LIMIT_GUIDE_MESSAGE
        : '작성하신 핵심 목표와 관련된 대주제들을 추천해 드릴게요',
      confirmText,
      resolve: handleSuggest,
    },

    topic: {
      title: isAiLimited ? LIMIT_GUIDE_TITLE : '소주제 추천받기',
      message: isAiLimited
        ? LIMIT_GUIDE_MESSAGE
        : '작성하신 대주제와 관련된 소주제들을 추천해 드릴게요',
      confirmText,
      resolve: handleSuggest,
    },
  };

  const isFullMainBlock = type === 'core' && topicValueList.length === 8;
  const isFullSubBlock = type === 'topic' && subtopicValueList.length === 8;
  const isDisableSuggestButton =
    isAiFetching || isFullMainBlock || isFullSubBlock;

  return (
    <div>
      <Button
        size={null}
        disabled={isDisableSuggestButton}
        variant='outline'
        onClick={() => {
          if (!value) {
            infoAlert('대주제가 비어있습니다.', '대주제를 입력해주세요');
            return;
          }
          if (isAiUsageCountFetching) {
            infoAlert(
              '잠시만 기다려주세요',
              'AI사용 횟 수를 불러오는 중입니다.'
            );
            return;
          }
          openAlert(
            'confirm',
            buttonActions[type].title,
            buttonActions[type].message,
            buttonActions[type].resolve,
            buttonActions[type].confirmText
          );
        }}
      >
        <div className='flex h-10 items-center gap-2 p-3'>
          {isAiFetching ? (
            <>
              <LoaderCircle className='animate-spin' />
              AI에게 데이터 요청중입니다.
            </>
          ) : (
            <>
              <Image
                alt='ai추천'
                src='/images/button-image/ai.svg'
                width={30}
                height={30}
              />
              {isFullMainBlock || isFullSubBlock
                ? FULL_BLOCK_MESSAGE
                : '막막하다면? AI가 도와드릴게요!'}
            </>
          )}
        </div>
      </Button>
    </div>
  );
};

export default AiSuggestButton;
