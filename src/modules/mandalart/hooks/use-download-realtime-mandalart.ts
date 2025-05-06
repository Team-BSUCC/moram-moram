import { toPng } from 'html-to-image';
import * as Sentry from '@sentry/nextjs';
import { errorAlert } from '@/shared/utils/sweet-alert';
import panzoom from 'panzoom';

const ONE_SECOND = 1000;

export const useDownloadMandalartInCanvas = (
  ref: React.RefObject<HTMLDivElement>,
  panzoomRef: React.RefObject<ReturnType<typeof panzoom>>,
  title: string = '내 만다라트'
) => {
  const handleDownloadCanvas = async (
    setIsDownloading: (value: boolean) => void
  ) => {
    if (!ref.current || !panzoomRef.current) return;
    setIsDownloading(true);

    const instance = panzoomRef.current;
    const { x, y, scale } = instance.getTransform();

    const originalStyle = {
      width: ref.current.style.width,
      height: ref.current.style.height,
      transform: ref.current.style.transform,
    };

    try {
      instance.moveTo(0, 0);
      instance.zoomAbs(0, 0, 1);

      ref.current.style.width = '880px';
      ref.current.style.height = '880px';
      ref.current.style.transform = 'none';

      const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart');
        scope.setTag('feature', 'Img Download Error');
        Sentry.captureException(new Error(`[Mandalart Page] ${error}`));
      });
      errorAlert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      ref.current.style.width = originalStyle.width;
      ref.current.style.height = originalStyle.height;
      ref.current.style.transform = originalStyle.transform;

      instance.zoomAbs(0, 0, scale);
      instance.moveTo(x, y);
      setTimeout(() => setIsDownloading(false), ONE_SECOND);
    }
  };

  return { handleDownloadCanvas };
};

export const useDownloadMandalartWithOutCanvas = (
  ref: React.RefObject<HTMLDivElement>,
  title: string = '내 만다라트'
) => {
  const handleDownload = async (setIsDownloading: (value: boolean) => void) => {
    if (!ref.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag('page', 'mandalart');
        scope.setTag('feature', 'Img Download Error');
        Sentry.captureException(new Error(`[Mandalart Page] ${error}`));
      });
      errorAlert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setTimeout(() => setIsDownloading(false), ONE_SECOND);
    }
  };

  return { handleDownload };
};
