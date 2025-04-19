import Image from 'next/image';
import Spacer from '../commons/spacer';
import Title from '../commons/title';
import Text from '../commons/text';

const IntroSection = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('/images/intro/background.png')] bg-cover bg-center bg-no-repeat">
      <div className='h-[1470px] w-full max-w-[1440px] px-[112px] py-[160px]'>
        <div className='h-[1150px] w-[1217px]'>
          {/* 텍스트 콘텐츠 */}
          <div className='flex flex-col items-center justify-center text-center'>
            <Title as='h2' size='40px-semibold'>
              막연한 목표, 어디서부터 시작해야 할지 막막하셨나요?
            </Title>
            <Spacer size='xl' />
            <Text size='32px-regular'>
              만다라트는 하나의 큰 목표를 작은 실천 항목으로 나누어
              <br />
              ‘무엇부터,어떻게’ 할지 쉽게 정리해주는 도구예요.
            </Text>
            <Spacer size='md' />
            <Text size='32px-regular'>
              중심에 ‘내가 이루고 싶은 목표’를 두고, 그걸 8가지 방향으로
              확장해보고,
              <br />또 그 안에서 할 수 있는 구체적인 실천을 하나하나 채워나가는
              방식이에요.
            </Text>
            <Spacer size='xl' />
            <div className='w-[916px] rounded-lg bg-lightgray px-12 py-4'>
              <Text size='28px-regular' align='center'>
                📌 참고로, 세계적인 야구 선수 오타니 쇼헤이도 고등학생 시절
                <br />이 만다라트 기법으로 목표를 정리하며 ‘메이저리거’라는 꿈을
                실현해냈어요.
              </Text>
            </div>
          </div>
          <Spacer size='xxxl' />
          {/* 이미지 콘텐츠 */}
          <div className='flex items-center justify-evenly'>
            <Image
              src='/images/intro/otani-mandalart.png'
              width={475}
              height={475}
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
              width={500}
              height={500}
              alt='오타니'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
