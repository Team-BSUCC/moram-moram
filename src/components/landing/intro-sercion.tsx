const IntroSection = () => {
  return (
    <section className='w-full bg-white px-4 py-24 sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto max-w-screen-xl text-center'>
        <h2 className='mb-4 text-2xl font-semibold sm:text-3xl'>
          막연한 목표, 어디서부터 시작해야 할지 막막하셨나요?
        </h2>
        <p className='text-gray-700 mx-auto max-w-2xl text-base leading-relaxed sm:text-lg'>
          만다라트는 하나의 큰 목표를 작은 실천 항목으로 나누어 ‘무엇부터,
          어떻게’ 할지 쉽게 정리해주는 도구예요.
          <br />
          중심에 ‘내가 이루고 싶은 목표’를 두고, 그걸 8가지 방향으로 확장해보고,
          또 그 안에서 할 수 있는 구체적인 실천을 하나하나 채워나가는
          방식이에요.
        </p>
        <div className='mt-10'>
          <img
            src=''
            alt='오타니 만다라트 설명 예시'
            className='mx-auto w-full max-w-3xl'
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
