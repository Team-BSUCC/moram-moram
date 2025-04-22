import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import TodayTodoList from '@/modules/today-list/components/today-todo-list';
import { getServerClient } from '@/shared/utils/supabase/server-client';

const TodayListPage = async () => {
  const supabase = getServerClient();
  const user = await getUserInfo();
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { data: myMandalarts, error } = await supabase.rpc(
    'get_all_mandalarts_by_user',
    { _user_id: user.id }
  );

  if (error) {
    /**
     * @todo: sentry 도입
     */
    throw new Error('Failed to fetch mandalarts');
  }

  return (
    <div className='h-full w-full bg-white-dark'>
      <Spacer size='top' />
      <div className='mx-auto flex w-10/12 flex-col items-start sm:w-4/5'>
        <Title as='h1' size='32px-semibold'>
          투두 모아보기
        </Title>
        <Text size='20px-regular' textColor='sub'>
          내 만다라트의 할 일들을 한 곳에서 간편하게 확인해보세요.
        </Text>
        <Spacer size='lg' />
        <TodayTodoList myMandalarts={myMandalarts} />
      </div>
      <Spacer size='top' />
    </div>
  );
};

export default TodayListPage;
