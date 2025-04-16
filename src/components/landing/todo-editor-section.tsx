const TodoEditorSection = () => {
  return (
    <section className='w-full bg-white px-4 py-24 sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto flex max-w-screen-xl flex-col items-center gap-10 lg:flex-row'>
        <div className='w-full max-w-md text-left'>
          <h3 className='mb-2 text-xl font-semibold'>
            각 칸을 클릭하면 투두리스트로 연결
          </h3>
          <p className='text-gray-700 text-base leading-relaxed'>
            중심 목표부터 세부 계획까지 보기 쉽게 시각적으로 정리해요.
          </p>
        </div>
        <div className='w-full max-w-lg'>
          <img
            src=''
            alt='투두리스트 에디터 예시'
            className='w-full rounded-lg shadow'
          />
        </div>
      </div>
    </section>
  );
};

export default TodoEditorSection;
