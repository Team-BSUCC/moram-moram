import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import RealtimeRoom from '@/modules/dashboard/components/realtime-room';

export default async function Page() {
  const user = await getUserInfo();

  return <RealtimeRoom user={user} />;
}
