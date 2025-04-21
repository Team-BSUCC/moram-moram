import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartMainContent from '@/modules/mandalart/components/mandalart-main-content';
import MandalartPasscodeGate from '@/modules/mandalart/components/mandalart-passcode-gate';

import { Tables } from '@/shared/types/database.types';
import { getServerClient } from '@/shared/utils/supabase/server-client';

type MandalartPageType = {
  params: { id: string };
};

const MandalartPage = async ({ params }: MandalartPageType) => {
  const user = await getUserInfo();
  const supabase = getServerClient();

  //TODO 동적으로 pathPram 가져오는 걸로 수정
  const pathParamRoomId = params.id;
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', pathParamRoomId);

  if (error) throw error;
  const roomInfo: Tables<'rooms'> = data[0];

  //TODO path로 가져온 룸ID를 기준으로 가져오는걸로 수정
  const mandalartId = '6424de9b-7fbf-470a-9743-c9bb5e3cdad8';

  //TODO 조인으로 파티셔널까지 다 긁어와서 비교 유저 id랑 하나라도 일치하면 만다라트 컴포넌트 렌더링
  const isAuthenticated = roomInfo.owner === user?.id;
  return (
    <>
      {isAuthenticated ? (
        <MandalartMainContent user={user} mandalartId={mandalartId} />
      ) : (
        <MandalartPasscodeGate
          user={user}
          roomId={pathParamRoomId}
          mandalartId={mandalartId}
        />
      )}
    </>
  );
};

export default MandalartPage;
