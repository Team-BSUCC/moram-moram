import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const IntroSection = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[url('/images/intro/background.png')] bg-cover bg-center bg-no-repeat px-4 py-20 sm:px-16 sm:py-40">
      <div className='flex w-full max-w-screen-xl flex-col items-center'>
        {/* 데스크탑/태블릿 전용 텍스트 */}
        <div className='hidden w-full flex-col items-center sm:flex'>
          <Title as='h2' size='40px-semibold'>
            막연한 목표, 어디서부터 시작해야 할지 막막하셨나요?
          </Title>

          <Spacer size='xl' />

          <Text size='32px-regular' align='center'>
            만다라트는 하나의 큰 목표를 작은 실천 항목으로 나누어
            <br />
            ‘무엇부터, 어떻게’ 할지 쉽게 정리해주는 도구예요.
          </Text>

          <Spacer size='md' />

          <Text size='32px-regular' align='center'>
            중심에 ‘내가 이루고 싶은 목표’를 두고, 그걸 8가지 방향으로
            확장해보고,
            <br />또 그 안에서 할 수 있는 구체적인 실천을 하나하나 채워나가는
            방식이에요.
          </Text>

          <Spacer size='xl' />

          <div className='w-full max-w-5xl rounded-lg bg-lightgray px-6 py-4 sm:px-12'>
            <Text size='28px-regular' align='center'>
              📌 참고로, 세계적인 야구 선수 오타니 쇼헤이도 고등학생 시절
              <br />이 만다라트 기법으로 목표를 정리하며 ‘메이저리거’라는 꿈을
              실현해냈어요.
            </Text>
          </div>
          <Spacer size='3xl' />
        </div>

        {/* 모바일 전용 텍스트 */}
        <div className='block w-full flex-col items-center justify-center text-center sm:hidden'>
          <Title as='h2' size='24px-semibold'>
            막연한 목표, 어디서부터 시작해야 할지 막막하셨나요?
          </Title>

          <Spacer size='lg' />

          <Text size='16px-regular' align='center'>
            만다라트는 하나의 큰 목표를 작은 실천 항목으로 나누어 ‘무엇부터,
            어떻게’ 할지 쉽게 정리해주는 도구예요.
          </Text>

          <Spacer size='md' />

          <Text size='16px-regular' align='center'>
            중심에 ‘내가 이루고 싶은 목표’를 두고, 8가지 방향으로 확장해보고,
            구체적인 실천을 하나하나 채워나가는 방식이에요.
          </Text>
          <Spacer size='md' />
        </div>

        {/* 데스크탑/태블릿 전용 이미지 구성 */}
        <div className='hidden w-full items-center justify-center gap-8 sm:flex'>
          {/* 만다라트 이미지 + 설명 */}
          <div className='flex min-w-0 flex-1 flex-col items-center gap-2'>
            <Image
              src='/images/intro/otani-mandalart.png'
              alt='오타니 만다라트'
              width={475}
              height={475}
              className='h-auto w-full max-w-[300px]'
            />
            <Text size='16px-medium' textColor='sub' align='center'>
              오타니가 실제로 작성한 만다라트 표 (번역본)
            </Text>
          </div>

          {/* 화살표 */}
          <div className='flex items-center justify-center'>
            <Image
              src='/images/intro/arrow.png'
              alt='화살표'
              width={180}
              height={134}
              className='h-auto w-full max-w-[100px]'
            />
          </div>

          {/* 오타니 이미지 */}
          <div className='flex min-w-0 flex-1 items-center justify-center'>
            <Image
              src='/images/intro/otani.png'
              alt='오타니'
              width={500}
              height={500}
              className='h-auto w-full max-w-[300px]'
            />
          </div>
        </div>

        {/* 모바일 전용 이미지 + 배경 */}
        <div className='relative block w-full px-4 py-20 text-left sm:hidden'>
          {/* 배경 이미지 - 오른쪽에 정렬 */}
          <div
            className="absolute inset-0 bg-[url('/images/intro/otani-background.png')] bg-contain bg-right bg-no-repeat opacity-60"
            aria-hidden
          />

          {/* 콘텐츠 */}
          <div className='relative z-10 flex flex-col items-center'>
            <Text size='16px-regular' align='center'>
              📌 세계적인 야구 선수 오타니 쇼헤이도
              <br />이 방법으로 ‘메이저리거’라는 꿈을 실현했어요.
            </Text>

            <Spacer size='xl' />

            <Image
              src='/images/intro/otani-mandalart.png'
              alt='오타니가 실제로 작성한 만다라트 표'
              width={300}
              height={300}
              className='w-full max-w-xs self-center'
            />

            <Spacer size='sm' />

            <Text size='16px-medium' textColor='sub'>
              오타니가 실제로 작성한 만다라트 표 (번역본)
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
