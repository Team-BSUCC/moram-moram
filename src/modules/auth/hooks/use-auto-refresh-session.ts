'use client';

import { useEffect } from 'react';
import URLS from '@/shared/constants/url-constants';
import { errorAlert } from '@/shared/utils/sweet-alert';

const useAutoRefreshSession = () => {
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`/api${URLS.REFRESH}`);
        if (!res.ok && res.status !== 401) {
          if (res.statusText === 'Unauthorized') {
            return;
          }
          errorAlert('세션 갱신 실패');
        }
      } catch (err) {
        errorAlert(`세션 갱신 중 오류 발생 : ${err}`);
      }
    };

    if (document.cookie.includes('sb-access-token')) {
      refresh();
    }
  }, []);
};

export default useAutoRefreshSession;
