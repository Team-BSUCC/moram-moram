'use client';

import useAutoRefreshSession from '@/modules/auth/hooks/use-auto-refresh-session';

const SessionInit = () => {
  useAutoRefreshSession();
  return null;
};

export default SessionInit;
