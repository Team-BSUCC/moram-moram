import Image from 'next/image';
import Text from '../commons/text';
import Title from '../commons/title';
import Spacer from '../commons/spacer';

const ProgressSection = () => {
  return (
    <div className='w-full px-4 py-20 sm:px-16 sm:py-40'>
      <div className='mx-auto w-full max-w-screen-xl'>
        {/* 상단 텍스트 영역 - 중앙 정렬 */}
        <div className='mb-20 flex flex-col items-center text-center'>
          <Title as='h2' size='32px-semibold'>
            목표 달성까지 디데이와 달성률을 한번에 확인
          </Title>
          <Spacer size='md' />
          <Text size='32px-regular'>얼마나 이뤄냈는지 한눈에 파악</Text>
        </div>

        {/* 데스크탑용 - 하단 좌우 나란히 배치 */}
        <div className='hidden sm:flex sm:justify-center'>
          <div className='flex w-full max-w-screen-xl items-center justify-between gap-16'>
            {/* 진행률 이미지 블록 */}
            <div className='relative aspect-[3/2] w-full max-w-[600px]'>
              <Image
                src='/images/progress/progress.png'
                alt='진행률 예시'
                fill
                className='object-contain'
              />
            </div>

            {/* 설명 텍스트 블록 */}
            <div className='flex flex-col justify-center gap-4'>
              <div className='flex items-center gap-3'>
                <Image
                  src='/images/progress/0.png'
                  alt='0% 완료'
                  width={24}
                  height={24}
                />
                <Text size='18px-medium'>
                  이제 막 시작했어요. 차근차근 한 칸씩 채워봐요 :)
                </Text>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/images/progress/30.png'
                  alt='30% 완료'
                  width={24}
                  height={24}
                />
                <Text size='18px-medium'>
                  조금씩 자라고 있어요, 매일의 실천이 큰 힘이 돼요 💪
                </Text>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/images/progress/60.png'
                  alt='60% 완료'
                  width={24}
                  height={24}
                />
                <Text size='18px-medium'>
                  눈에 띄게 성장 중이에요! 목표가 점점 가까워지고 있어요 :)
                </Text>
              </div>
              <div className='flex items-center gap-3'>
                <Image
                  src='/images/progress/100.png'
                  alt='100% 완료'
                  width={24}
                  height={24}
                />
                <Text size='18px-medium'>
                  멋지게 해냈어요! 당신의 노력이 꽃을 피웠어요 🎉🌸
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일용 */}
        <div className='flex flex-col items-center gap-8 sm:hidden'>
          <div className='relative aspect-[3/2] w-full max-w-[345px]'>
            <Image
              src='/images/progress/progress.png'
              alt='진행률 예시'
              fill
              className='object-contain'
            />
          </div>

          <div className='flex flex-col items-start gap-4'>
            <div className='flex items-center gap-3'>
              <Image
                src='/images/progress/0.png'
                alt='0% 완료'
                width={20}
                height={20}
              />
              <Text size='16px-regular'>
                이제 막 시작했어요. 차근차근 한 칸씩 채워봐요 :)
              </Text>
            </div>
            <div className='flex items-center gap-3'>
              <Image
                src='/images/progress/30.png'
                alt='30% 완료'
                width={20}
                height={20}
              />
              <Text size='16px-regular'>
                조금씩 자라고 있어요, 매일의 실천이 큰 힘이 돼요 💪
              </Text>
            </div>
            <div className='flex items-center gap-3'>
              <Image
                src='/images/progress/60.png'
                alt='60% 완료'
                width={20}
                height={20}
              />
              <Text size='16px-regular'>
                눈에 띄게 성장 중이에요! 목표가 점점 가까워지고 있어요 :)
              </Text>
            </div>
            <div className='flex items-center gap-3'>
              <Image
                src='/images/progress/100.png'
                alt='100% 완료'
                width={20}
                height={20}
              />
              <Text size='16px-regular'>
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
