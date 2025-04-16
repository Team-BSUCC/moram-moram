const MandalartExplainSection = () => {
  return (
    <section className='w-full bg-[#F9F9F9] px-4 py-24 sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto flex max-w-screen-xl flex-col items-center text-center'>
        <h3 className='text-gray-800 text-xl font-medium'>
          막막하다면? <span className='text-purple-500'>AI</span>가
          도와드릴게요!
        </h3>
        <div className='mt-8 grid max-w-xl grid-cols-3 gap-4'>
          <img src='' alt='칸 예시 1' className='w-full rounded-lg shadow' />
          <img src='' alt='칸 예시 2' className='w-full rounded-lg shadow' />
          <img src='' alt='칸 예시 3' className='w-full rounded-lg shadow' />
        </div>
      </div>
    </section>
  );
};

export default MandalartExplainSection;
