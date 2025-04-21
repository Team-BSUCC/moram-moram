import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const CalendarSection = () => {
  return (
    <section className='w-full px-4 py-20 sm:px-16 sm:py-40'>
      <div className='mx-auto w-full max-w-screen-xl'>
        {/* 데스크탑/태블릿용 */}
        <div className='hidden flex-col items-center sm:flex'>
          <Title as='h2' size='32px-semibold'>
            캘린더에서
          </Title>
          <Spacer size='md' />
          <Text size='32px-regular'>오늘 할 일을 한눈에 확인</Text>
          <Spacer size='2xl' />
          <div className='w-full max-w-[1200px]'>
            <Image
              src='/images/calendar/calendar.png'
              width={1200}
              height={600}
              alt='calendar'
              className='h-auto w-full object-contain'
            />
          </div>
        </div>

        {/*모바일용 */}
        <div className='flex flex-col items-center text-center sm:hidden'>
          <Title as='h2' size='18px-semibold'>
            캘린더에서
          </Title>
          <Spacer size='md' />
          <Text size='16px-regular'>오늘 할 일을 한눈에 확인</Text>
          <Spacer size='xl' />
          <div className='w-full max-w-[320px]'>
            <Image
              src='/images/calendar/calendar-mobile.png'
              width={320}
              height={160}
              alt='calendar'
              className='h-auto w-full object-contain'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
