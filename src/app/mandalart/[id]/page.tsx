import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartMainContent from '@/modules/mandalart/components/mandalart-main-content';
import MandalartPasscodeGate from '@/modules/mandalart/components/mandalart-passcode-gate';
import { getServerClient } from '@/shared/utils/supabase/server-client';
import { PostgrestError } from '@supabase/supabase-js';
import * as Sentry from '@sentry/nextjs';

type MandalartPageType = {
  params: { id: string };
};

type FetchDataType = {
  data: { ownerId: string; mandalartId: string; participants: string[] };
  error: PostgrestError | null;
};

const MandalartPage = async ({ params }: MandalartPageType) => {
  const user = await getUserInfo();
  const supabase = getServerClient();

  const pathParamRoomId = params.id;
  const { data, error } = (await supabase.rpc('fetch_room_data_for_mandalart', {
    room_uuid: pathParamRoomId,
  })) as FetchDataType;

  if (error) {
    Sentry.withScope((scope) => {
      scope.setTag('page', 'Mandalart Page');
      scope.setTag('feature', 'fetch_room_data_for_mandalart');

      Sentry.captureException(new Error(`[Mandalart Page] ${error.message}`));
    });
  }

  const isAuthenticated =
    data.ownerId === user?.id || data.participants.includes(user?.id ?? '');

  const mandalartId = data.mandalartId;
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
