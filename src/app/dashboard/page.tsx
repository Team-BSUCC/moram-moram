'use server';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import DashBoard from '@/modules/dashboard/components/dashboard';

const DashBoardPage = async () => {
  const user = await getUserInfo();
  const userId = user?.id ?? '';
  return (
    <div className='h-full w-full bg-white-dark'>
      <DashBoard user={userId} />
    </div>
  );
};

export default DashBoardPage;
