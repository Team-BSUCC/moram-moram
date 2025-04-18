import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartMainContent from '@/modules/mandalart/components/mandalart-main-content';

const MandalartPage = async () => {
  const user = await getUserInfo();
  return <MandalartMainContent user={user} />;
};

export default MandalartPage;
