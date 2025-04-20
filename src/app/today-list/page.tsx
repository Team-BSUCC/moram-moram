import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import TodayTodoList from '@/modules/today-list/components/today-todo-list';
import { getServerClient } from '@/shared/utils/supabase/server-client';

const TodayListPage = async () => {
  const supabase = getServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error('로그인이 필요합니다.');
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
      <div className='mx-auto flex w-2/3 flex-col items-start'>
        <Title as='h1' size='32px-semibold'>
          투두 모아보기
        </Title>
        <Text size='20px-regular' textColor='sub'>
          내 만다라트 별 TO DO LIST를 한번에 확인하세요.
        </Text>
        <Spacer size='lg' />
        <TodayTodoList myMandalarts={myMandalarts} />
      </div>
      <Spacer size='top' />
    </div>
  );
};

export default TodayListPage;
