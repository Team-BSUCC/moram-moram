import {
  errorAlert,
  infoAlert,
  successAlert,
} from '@/shared/utils/sweet-alert';
import { useQueryClient } from '@tanstack/react-query';
import * as Sentry from '@sentry/nextjs';
import { useCreateRoom } from './use-create-room';
import { DateRangeState } from '../types/dashboard-type';

export const useMandalartCreator = (
  user: string | null,
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateRoom();

  const create = async ({
    title,
    subTitle,
    selectedColor,
    date,
  }: {
    title: string;
    subTitle: string;
    selectedColor: number;
    date: DateRangeState;
  }) => {
    if (!user) return infoAlert('유저 정보 없음');
    if (!title) return infoAlert('제목을 입력해주세요');

    const isValidDate =
      new Date(+date.startYear, +date.startMonth - 1, +date.startDay) <=
      new Date(+date.endYear, +date.endMonth - 1, +date.endDay);
    if (!isValidDate) return infoAlert('종료일은 시작일보다 이후여야 해요');

    try {
      await mutateAsync({
        userId: user,
        title,
        subTitle,
        color: selectedColor,
        startDate: `${date.startYear}.${date.startMonth}.${date.startDay}`,
        endDate: `${date.endYear}.${date.endMonth}.${date.endDay}`,
      });

      successAlert('만다라트 생성 완료!');
      queryClient.invalidateQueries({ queryKey: ['mandalarts-cards'] });
      onSuccessCallback();
    } catch (err) {
      Sentry.captureException(
        new Error(`[handleCreateMandalart] ${(err as any).message}`)
      );
      errorAlert('오류 발생: ' + (err as any).message);
    }
  };

  return { create };
};
