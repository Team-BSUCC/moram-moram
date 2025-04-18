import React from 'react';
import Text from '../commons/text';
import Spacer from '../commons/spacer';
import Button from '../commons/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero/landing-img-hero.png')] bg-cover bg-center bg-no-repeat">
      {/* 반투명 그라디언트 배경 */}
      <div className='pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-[linear-gradient(to_right,_white_0%,_white_50px,_rgba(255,255,255,0)_100%)]' />

      {/* 텍스트 콘텐츠 */}
      <div className='relative h-full w-full items-center'>
        <div className='w-full sm:px-6 sm:py-12 md:px-8 md:py-24 lg:px-24 lg:py-40'>
          <div className='flex flex-col items-start'>
            <h1 className='text-[32px] font-bold'>
              목표를 구체적으로,
              <br />
              계획을 실행 가능하게
            </h1>
            {/* 제목 ↔ 본문 간격 */}
            <div className='mt-6 text-base leading-relaxed sm:text-lg'>
              <Text align='left'>
                막연했던 목표도 차근차근, 구체적인 계획으로.
              </Text>
              <Text align='left'>
                한 칸씩 채우며 나아가는 여정에 Manda가 함께할게요.
              </Text>
            </div>
            <Spacer size='xl' />
            <Button>지금 시작하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
