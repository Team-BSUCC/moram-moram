import Image from 'next/image';
import Spacer from '../commons/spacer';

const IntroSection = () => {
  return (
    <section className="relative min-h-screen w-full bg-[url('/images/intro/background.png')] bg-cover bg-center bg-no-repeat">
      {/* 텍스트 콘텐츠 */}
      <div className='mx-auto flex flex-col items-center justify-center text-center'>
        <Spacer size='xxxl' />
        <h2 className='mb-4 text-2xl font-semibold sm:text-3xl'>
          막연한 목표, 어디서부터 시작해야 할지 막막하셨나요?
        </h2>
        <Spacer size='xl' />
        <p>
          만다라트는 하나의 큰 목표를 작은 실천 항목으로 나누어
          <br />
          ‘무엇부터,어떻게’ 할지 쉽게 정리해주는 도구예요.
        </p>
        <Spacer size='md' />
        <p>
          중심에 ‘내가 이루고 싶은 목표’를 두고, 그걸 8가지 방향으로 확장해보고,
          <br />또 그 안에서 할 수 있는 구체적인 실천을 하나하나 채워나가는
          방식이에요.
        </p>
        <Spacer size='xl' />
        <div className='w-[820px] bg-lightgray px-12 py-6'>
          <p>
            📌 참고로, 세계적인 야구 선수 오타니 쇼헤이도 고등학생 시절
            <br />이 만다라트 기법으로 목표를 정리하며 ‘메이저리거’라는 꿈을
            실현해냈어요.
          </p>
        </div>

        <div className='mt-10'></div>
      </div>
      {/* 이미지 콘텐츠 */}
      <div className='flex items-center justify-evenly'>
        <Image
          src='/images/intro/otani-mandalart.png'
          width={400}
          height={400}
          alt='오타니 만다라트'
        />
        <Image
          src='/images/intro/arrow.png'
          width={180}
          height={134}
          alt='화살표'
        />
        <Image
          src='/images/intro/otani.png'
          width={400}
          height={400}
          alt='오타니'
        />
      </div>
    </section>
  );
};

export default IntroSection;
