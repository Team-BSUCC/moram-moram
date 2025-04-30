import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartCalendar from '@/modules/calendar/components/mandalart-calendar';

const CalendarPage = async () => {
  const user = await getUserInfo();

  return (
    <div className='h-full w-full bg-white-dark'>
      <Spacer size='top' />
      <div className='mx-[10px] sm:mx-auto sm:w-[90%] lg:w-[60%]'>
        <Title as='h1' size='32px-semibold'>
          캘린더
        </Title>
        <Text size='20px-regular' textColor='sub'>
          날짜별 해야 할 일을 한눈에 보고, 날짜를 눌러 상세한 할 일까지 확인해
          보세요.
        </Text>
      </div>
      <MandalartCalendar user={user} />
      <Spacer size='top' />
    </div>
  );
};

export default CalendarPage;
