import Button from '../commons/button';

const CTASection = () => {
  return (
    <section className='w-full bg-gradient-to-b from-white to-purple-50 px-4 py-24 text-center sm:px-8 md:px-12 lg:px-16'>
      <div className='mx-auto max-w-screen-md'>
        <p className='text-gray-700 mb-4 text-base'>
          생각은 추상적일 수 있어도, 실천은 구체적이어야 하니까.
        </p>
        <h3 className='mb-6 text-2xl font-bold'>
          당신의 목표, 지금 만다라트로 정리해보세요.
        </h3>
        <Button>지금 시작하기</Button>
      </div>
    </section>
  );
};

export default CTASection;
