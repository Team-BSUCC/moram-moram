'use client';

import { RealtimeCursors } from '@/components/realtime-cursors';

const page = () => {
  return (
    <div className='min-h-screen w-full'>
      <h2>실시간 커서 테스트</h2>
      <RealtimeCursors
        roomName='macrodata_refinement_office'
        username='Mark Scout'
      />
    </div>
  );
};

export default page;
