import Button from '../commons/button';
import Spacer from '../commons/spacer';

const CTASection = () => {
  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e9e4f0]'>
      <div className='text-center'>
        <p className='mb-3 text-lg'>
          생각은 추상적일 수 있어도,
          <br />
          실천은 구체적이어야 하니까.
        </p>
        <Spacer size='xl' />
        <h3 className='text-gray-900 mb-6 text-2xl font-bold'>
          당신의 목표, 지금{' '}
          <span className='font-extrabold text-purple-pigment'>만다</span>로
          정리해보세요.
        </h3>
        <Spacer size='xl' />
        <Button size='landing'>지금 시작하기</Button>
      </div>
    </section>
  );
};

export default CTASection;
