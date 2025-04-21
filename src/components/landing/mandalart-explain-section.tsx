import Image from 'next/image';
import Text from '../commons/text';
import Title from '../commons/title';
import Spacer from '../commons/spacer';

const getColorWithNumber = (index: number): string => {
  const idx = index % 8;
  const color: Record<number, string> = {
    0: 'bg-pink-pastel',
    1: 'bg-red-pastel',
    2: 'bg-orange-pastel',
    3: 'bg-purple-pastel',
    4: 'bg-yellow-pastel',
    5: 'bg-blue-pastel',
    6: 'bg-sky-pastel',
    7: 'bg-green-pastel',
  };
  return color[idx];
};

const MandalartExplainSection = () => {
  return (
    <div className='mx-auto w-full max-w-screen-xl px-4 py-20 sm:flex sm:items-start sm:justify-center sm:gap-24 sm:px-16 sm:py-40'>
      {/* 데스크탑 전용 - 그리드 + 텍스트 */}
      <div className='hidden w-full sm:flex sm:items-center sm:justify-center sm:gap-16'>
        {/* 🔹 3x3 만다라트 */}
        <div className='relative grid aspect-square w-full max-w-[625px] grid-cols-3 grid-rows-3 gap-2'>
          {Array.from({ length: 9 }).map((_, i) => {
            if (i === 4) {
              return (
                <div
                  key={i}
                  className='relative flex items-center justify-center rounded-[16px] border-2 border-black bg-purple-400 px-2 text-center font-bold text-black'
                >
                  <Text size='20px-regular'>
                    2025년 <br />
                    성장의 해로 <br /> 만들기
                  </Text>

                  {/* 말풍선 */}
                  <div className='absolute -top-40 left-24 flex min-w-[300px] max-w-[90%] items-center gap-2 rounded-[16px] bg-white px-4 py-2 shadow-lg'>
                    <Image
                      src='/images/mandalart/ai-icon.png'
                      alt='ai'
                      width={24}
                      height={24}
                    />
                    <Text size='16px-regular'>
                      막막하다면? AI가 도와드릴게요!
                    </Text>
                  </div>
                </div>
              );
            }

            const colorClass = getColorWithNumber(i > 4 ? i - 1 : i);
            return <div key={i} className={`rounded-md ${colorClass}`} />;
          })}

          {/* 🤖 작은 아이콘 (좌상단 셀 위) */}
          <div className='absolute left-[25%] top-[35%]'>
            <Image
              src='/images/mandalart/ai-icon.png'
              alt='ai'
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* 🔹 설명 텍스트 */}
        <div className='flex flex-col text-left'>
          <Title as='h2' size='32px-semibold'>
            AI와 함께 완성하는 나만의 만다라트
          </Title>
          <Spacer size='md' />
          <Text size='20px-regular'>
            막연한 생각을 구체적인 계획으로 세분화하고,
            <br />
            막힐 땐 AI와 함께 설계해봐요.
          </Text>
        </div>
      </div>

      {/* 모바일 전용 */}
      <div className='block flex flex-col items-center justify-center sm:hidden'>
        {/* 🔹 텍스트 */}
        <div className='flex flex-col items-center text-center'>
          <Title as='h2' size='24px-semibold'>
            AI와 함께 완성하는 나만의 만다라트
          </Title>
          <Spacer size='md' />
          <Text size='20px-regular' align='center'>
            막연한 생각을 구체적인 계획으로 세분화하고,
            <br />
            막힐 땐 AI와 함께 설계해봐요.
          </Text>
        </div>

        <Spacer size='3xl' />

        {/* 🔹 3x3 그리드 */}
        <div className='relative grid aspect-square w-full max-w-[280px] grid-cols-3 grid-rows-3 gap-1 text-sm'>
          {Array.from({ length: 9 }).map((_, i) => {
            if (i === 4) {
              return (
                <div
                  key={i}
                  className='relative flex items-center justify-center rounded-md border-2 border-black bg-purple-400 px-1 text-center font-bold text-black'
                >
                  <Text size='16px-regular'>
                    2025년 <br />
                    성장의 해로 <br /> 만들기
                  </Text>

                  {/* 모바일용 말풍선 */}
                  <div className='absolute -right-28 -top-20 flex min-w-[240px] max-w-full items-center justify-center gap-2 rounded-[8px] bg-white px-4 py-2 shadow-lg'>
                    <Image
                      src='/images/mandalart/ai-icon.png'
                      alt='ai'
                      width={20}
                      height={20}
                    />
                    <Text size='16px-regular'>
                      막막하다면? AI가 도와드릴게요!
                    </Text>
                  </div>
                </div>
              );
            }

            const colorClass = getColorWithNumber(i > 4 ? i - 1 : i);
            return <div key={i} className={`rounded-md ${colorClass}`} />;
          })}

          {/* 🤖 작은 아이콘 */}
          <div className='absolute left-[25%] top-[35%]'>
            <Image
              src='/images/mandalart/ai-icon.png'
              alt='ai'
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandalartExplainSection;
