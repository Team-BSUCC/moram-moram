import Image from 'next/image';
import Spacer from '../commons/spacer';

const CalendarSection = () => {
  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-center'>
      {/* 텍스트 영역 */}
      <div className='flex w-full flex-col items-center justify-center'>
        <h1 className='text-[36px] font-bold'>캘린더에서</h1>
        <p className='text-[32px]'>오늘 할 일을 한눈에 확인</p>
      </div>
      <Spacer size='xl' />
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
