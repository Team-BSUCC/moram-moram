import { useEffect } from 'react';
import { useBroadcastStore } from './use-broadcast-store';

/**
 * 브로드캐스트스토어 정보 수파베이스에 배치업데이트를 트리거하는 커스텀 훅
 * 5초마다 배치업데이트를 진행,
 * 페이지가 언마운트시 배치업데이트를 진행
 */
export const useBatchUpdateTrigger = () => {
  const batchUpdateSupabase = useBroadcastStore(
    (state) => state.batchUpdateSupabase
  );

  useEffect(() => {
    setInterval(() => {
      batchUpdateSupabase();
    }, 5 * 1000);
    return () => {
      batchUpdateSupabase();
    };
  }, []);
};
