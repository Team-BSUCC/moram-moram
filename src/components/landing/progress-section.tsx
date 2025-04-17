import Image from 'next/image';
import Spacer from '../commons/spacer';

const ProgressSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center bg-[url('/images/progress/background.png')] bg-cover bg-center bg-no-repeat">
      <div className='mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-6 lg:flex-row'>
        {/* 이미지 영역 */}
        <div className='w-full max-w-lg'>
          <Image
            src='/images/progress/progress.png'
            width={500}
            height={500}
            alt='todo 예시'
          />
        </div>

        {/* 텍스트 영역 */}
        <div className='flex h-[500px] w-full max-w-md flex-col justify-center gap-6'>
          <div className='flex items-center gap-4'>
            <Image
              src='/images/progress/0.png'
              width={50}
              height={50}
              alt='0% 완료'
            />
            <p className='text-[20px]'>
              이제 막 시작했어요. 차근차근 한 칸씩 채워봐요 :)
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Image
              src='/images/progress/30.png'
              width={50}
              height={50}
              alt='30% 완료'
            />
            <p className='text-[20px]'>
              조금씩 자라고 있어요, 매일의 실천이 큰 힘이 돼요 💪
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Image
              src='/images/progress/60.png'
              width={50}
              height={50}
              alt='60% 완료'
            />
            <p className='text-[20px]'>
              눈에 띄게 성장 중이에요! 목표가 점점 가까워지고 있어요 :)
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Image
              src='/images/progress/100.png'
              width={50}
              height={50}
              alt='100% 완료'
            />
            <p className='text-[20px]'>
              멋지게 해냈어요! 당신의 노력이 꽃을 피웠어요 🎉🌸
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
