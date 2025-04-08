'use client';

import { useEffect } from 'react';
import URLS from '@/shared/constants/url-constants';
import Swal from 'sweetalert2';

const useAutoRefreshSession = () => {
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`/api/${URLS.REFRESH}`);
        if (!res.ok) {
          if (res.statusText === 'Unauthorized') {
            return;
          }
          Swal.fire({
            icon: 'error',
            title: '세션 갱신 실패',
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `세션 갱신 중 오류 발생 : ${err}`,
        });
      }
    };

    refresh();
  }, []);
};

export default useAutoRefreshSession;
