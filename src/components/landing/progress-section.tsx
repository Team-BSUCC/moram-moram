const ProgressSection = () => {
  return (
    <section className='w-full bg-[#FCFCFC] px-4 py-24 sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto max-w-screen-xl text-center'>
        <h3 className='mb-4 text-xl font-semibold'>
          목표 달성까지 디데이와 달성률을 한눈에 확인
        </h3>
        <p className='text-gray-600 text-base'>얼마나 이뤘는지 한눈에 파악</p>
        <div className='mt-10 flex flex-wrap justify-center gap-6'>
          <img
            src=''
            alt='진행률 카드 1'
            className='w-[280px] rounded-lg shadow'
          />
          <img
            src=''
            alt='진행률 카드 2'
            className='w-[280px] rounded-lg shadow'
          />
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
