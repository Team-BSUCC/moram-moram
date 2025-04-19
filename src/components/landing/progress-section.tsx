import Image from 'next/image';
import Text from '../commons/text';
import Title from '../commons/title';
import Spacer from '../commons/spacer';

const ProgressSection = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[url('/images/progress/background.png')] bg-cover bg-center bg-no-repeat">
      <div className='mx-auto flex h-full max-h-[1080px] w-full max-w-[1440px] flex-col items-center justify-between'>
        {/*제목 영역*/}
        <Title as='h2' size='32px-semibold'>
          목표 달성까지 디데이와 달성률을 한번에 확인
        </Title>
        <Spacer size='md' />

        <Text size='32px-regular'>얼마나 이뤄냈는지 한눈에 파악</Text>
        <div className='flex w-full items-center justify-evenly'>
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
              <Text size='18px-medium'>
                이제 막 시작했어요. 차근차근 한 칸씩 채워봐요 :)
              </Text>
            </div>

            <div className='flex items-center gap-4'>
              <Image
                src='/images/progress/30.png'
                width={50}
                height={50}
                alt='30% 완료'
              />
              <Text size='18px-medium'>
                조금씩 자라고 있어요, 매일의 실천이 큰 힘이 돼요 💪
              </Text>
            </div>

            <div className='flex items-center gap-4'>
              <Image
                src='/images/progress/60.png'
                width={50}
                height={50}
                alt='60% 완료'
              />
              <Text size='18px-medium'>
                눈에 띄게 성장 중이에요! 목표가 점점 가까워지고 있어요 :)
              </Text>
            </div>

            <div className='flex items-center gap-4'>
              <Image
                src='/images/progress/100.png'
                width={50}
                height={50}
                alt='100% 완료'
              />
              <Text size='18px-medium'>
                멋지게 해냈어요! 당신의 노력이 꽃을 피웠어요 🎉🌸
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
