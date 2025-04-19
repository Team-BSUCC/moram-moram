import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const CalendarSection = () => {
  return (
    <section className='mx-auto flex h-screen max-h-[1080px] w-full max-w-[1440px] flex-col items-center justify-center'>
      {/* 텍스트 영역 */}
      <div className='flex w-full flex-col items-center justify-center'>
        <Title as='h2' size='32px-semibold'>
          캘린더에서
        </Title>
        <Text size='32px-regular'>오늘 할 일을 한눈에 확인</Text>
      </div>
      <Spacer size='2xl' />
      {/* 사진 영역 */}
      <Image
        src='/images/calendar/calendar.png'
        width={1200}
        height={600}
        alt='calendar'
      />
    </section>
  );
};

export default CalendarSection;
