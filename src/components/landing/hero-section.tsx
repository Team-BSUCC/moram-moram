import React from 'react';
import Text from '../commons/text';
import Spacer from '../commons/spacer';
import Button from '../commons/button';
import Title from '../commons/title';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero/landing-img-hero.png')] bg-cover bg-center bg-no-repeat">
      {/* 🔹 반투명 그라디언트 배경 */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-[linear-gradient(to_right,_white_0%,_white_200px,_rgba(255,255,255,0)_100%)] max-sm:hidden' />
      <div className='pointer-events-none absolute left-0 top-0 h-[75%] w-full bg-[linear-gradient(to_bottom,_white_0%,_white_200px,_rgba(255,255,255,0)_100%)] sm:hidden' />

      {/* 🔹 텍스트 콘텐츠 컨테이너 */}
      <div className='relative mx-auto min-h-screen w-full max-w-screen-xl px-6 pb-20 pt-20 sm:px-24 sm:pb-40 sm:pt-32'>
        {/* ✅ PC/태블릿용 (640px 이상) */}
        <div className='hidden sm:block'>
          <div className='mx-auto max-w-5xl'>
            <div className='flex flex-col text-left'>
              <Title as='h1' size='48px-semibold'>
                목표를 구체적으로,
                <br />
                계획을 실행 가능하게
              </Title>
              <Spacer size='lg' />
              <Text size='36px-regular' textColor='sub'>
                막연했던 목표도 차근차근, 구체적인 계획으로.
              </Text>
              <Text size='36px-regular' textColor='sub'>
                한 칸씩 채우며 나아가는 여정에 Manda가 함께할게요.
              </Text>
              <Spacer size='xl' />
              <Button size='large'>지금 시작하기</Button>
            </div>
          </div>
        </div>

        {/* ✅ 모바일용 */}
        <div className='block sm:hidden'>
          <div className='mx-auto w-full max-w-md'>
            <div className='flex flex-col items-center space-y-5 text-center'>
              <Title as='h1' size='28px-semibold'>
                목표를 구체적으로,
                <br />
                계획을 실행 가능하게
              </Title>
              <Text size='20px-regular' textColor='sub'>
                막연했던 목표도 차근차근, 구체적인 계획으로.
              </Text>
              <Text size='20px-regular' textColor='sub'>
                한 칸씩 채우며 나아가는 여정에 <br /> Manda가 함께할게요.
              </Text>
              <Button size='medium'>지금 시작하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
