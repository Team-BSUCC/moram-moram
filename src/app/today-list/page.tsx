import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import TodayTodoList from '@/modules/today-list/components/today-todo-list';

const TodayListPage = async () => {
  const user = await getUserInfo();

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
        <TodayTodoList user={user} />
      </div>
      <Spacer size='top' />
    </div>
  );
};

export default TodayListPage;
