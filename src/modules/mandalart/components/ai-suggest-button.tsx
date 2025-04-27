import Button from '@/components/commons/button';
import React from 'react';
import { useGetAiUsageCountQuery } from '../hooks/use-get-ai-usage-count-query';
import { useUsageCountMutations } from '../hooks/use-usage-count-mutations';
import { infoAlert } from '@/shared/utils/sweet-alert';
import { useClientStateStore } from '../hooks/use-client-state-store';
import Image from 'next/image';
import { fetchGetAiSuggestKeywords } from '../services/fetch-get-ai-suggest-keywords';
import { useChannelStore } from '../hooks/use-channel-store';
import { useCellBroadcastMutation } from '../hooks/use-cell-broadcast-mutation';
import useTodoFloatingSheetStore from '../hooks/use-todo-floating-sheet-store';

type AiSuggestButtonProps = {
  value: string;
  type: 'core' | 'topic';
};

const AiSuggestButton = ({ value, type }: AiSuggestButtonProps) => {
  const { aiUsageCount } = useGetAiUsageCountQuery();
  const { mutateAsync: usageCountPlus } = useUsageCountMutations();

  const channel = useChannelStore((state) => state.channel);
  const { mutate: mutationCell } = useCellBroadcastMutation(channel);

  const topics = useClientStateStore((state) => state.topics);
  const subTopics = useClientStateStore((state) => state.subTopics);

  const info = useTodoFloatingSheetStore((state) => state.info);
  if (info === undefined || info === null) {
    return <div>오류</div>;
  }

  const MAX_AI_USAGE_COUNT = 30;

  const handleAiTopicSuggest = async () => {
    if (aiUsageCount === null || aiUsageCount >= MAX_AI_USAGE_COUNT) {
      infoAlert('사용할 수 없습니다.');
      return;
    }

    const topicList = Array.from(topics.values());
    const topicValueList = topicList
      .filter((topicValue) => topicValue.topic)
      .map((topicValue) => topicValue.topic);

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

  const handleAiSubTopicSuggest = async () => {
    if (aiUsageCount === null || aiUsageCount >= MAX_AI_USAGE_COUNT) {
      infoAlert('사용할 수 없습니다.');
      return;
    }

    const subtopicList = Array.from(
      subTopics
        .values()
        .filter((subtopicValue) => subtopicValue.topicId === info.id)
    );
    const subtopicValueList = subtopicList
      .filter((subtopicValue) => subtopicValue.content)
      .map((subtopicValue) => subtopicValue.content);

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

  return (
    <div>
      <Button
        size={null}
        variant='outline'
        onClick={
          // 누르면 모달이나 알럿창떠서 거기서 ai추천 선택할 수 있게 구현
          type === 'core' ? handleAiTopicSuggest : handleAiSubTopicSuggest
        }
      >
        <div className='flex h-10 items-center gap-2 p-3'>
          <Image
            alt='ai추천'
            src='/images/button-image/ai.svg'
            width={30}
            height={30}
          />
          막막하다면? AI가 도와드릴게요!
        </div>
      </Button>
    </div>
  );
};

export default AiSuggestButton;
