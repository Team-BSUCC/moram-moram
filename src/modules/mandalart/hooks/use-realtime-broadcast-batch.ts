import { useEffect } from 'react';
import { useBroadcastStore } from './use-broadcast-store';

/**
 * 브로드캐스트스토어 정보 배치업데이트를 트리거하는 커스텀 훅
 */
export const useBatchUpdateTrigger = () => {
  const batchUpdateSupabase = useBroadcastStore(
    (state) => state.batchUpdateSupabase
  );

  useEffect(() => {
    return () => {
      batchUpdateSupabase();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
