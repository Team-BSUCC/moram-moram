import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartMainContent from '@/modules/mandalart/components/mandalart-main-content';
import MandalartPasscodeGate from '@/modules/mandalart/components/mandalart-passcode-gate';

import { Tables } from '@/shared/types/database.types';
import { getServerClient } from '@/shared/utils/supabase/server-client';

const MandalartPage = async () => {
  const user = await getUserInfo();
  const supabase = getServerClient();

  const pathParamRoomId = 'e5a689a9-0f5f-4cdb-935e-9250ca71f60f';
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', pathParamRoomId);

  if (error) throw error;
  const roomInfo: Tables<'rooms'> = data[0];

  //조인으로 파티셔널까지 다 긁어와서 비교 유저 id랑 하나라도 일치하면 만다라트 컴포넌트 렌더링
  const isAuthenticated = roomInfo.owner === user?.id;
  return (
    <>
      {isAuthenticated ? (
        <MandalartMainContent user={user} />
      ) : (
        <MandalartPasscodeGate user={user} roomId={pathParamRoomId} />
      )}
    </>
  );
};

export default MandalartPage;
