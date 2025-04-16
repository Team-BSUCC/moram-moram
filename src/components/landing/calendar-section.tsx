const CalendarSection = () => {
  return (
    <section className='w-full bg-white px-4 py-24 sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto max-w-screen-xl text-center'>
        <h3 className='mb-4 text-xl font-semibold'>
          📅 캘린더에서 오늘 할 일을 한눈에 확인
        </h3>
        <div className='mt-10 flex flex-col items-center justify-center gap-8 lg:flex-row'>
          <img
            src=''
            alt='캘린더 예시'
            className='w-full max-w-md rounded-lg shadow'
          />
          <img
            src=''
            alt='할일 목록'
            className='w-full max-w-md rounded-lg shadow'
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
