import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import TodayTodoList from '@/modules/today-list/components/today-todo-list';

const TodayListPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/my-mandalarts`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch mandalarts');
  }

  const mandalarts = await response.json();

  return (
    <div className='mb-[72px] h-full w-full bg-white-dark'>
      <div className='mx-auto flex w-2/3 flex-col items-start'>
        <Spacer size='top' />
        <Title as='h1' size='32px-semibold'>
          투두 모아보기
        </Title>
        <Text size='20px-regular' textColor='sub'>
          내 만다라트 별 TO DO LIST를 한번에 확인하세요.
        </Text>
        <Spacer size='lg' />
        <TodayTodoList initialMandalarts={mandalarts} />
      </div>
    </div>
  );
};

export default TodayListPage;
