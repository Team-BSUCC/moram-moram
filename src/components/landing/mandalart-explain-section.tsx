import Image from 'next/image';
import Text from '../commons/text';
import Title from '../commons/title';

const MandalartExplainSection = () => {
  return (
    <div className='mx-auto flex h-screen max-h-[1080px] w-full max-w-[1440px] flex-col justify-center'>
      <div className='flex items-center justify-evenly'>
        {/* 왼쪽: 만다라트 3x3 */}
        <div className='relative grid h-[600px] w-[600px] grid-cols-3 grid-rows-3 gap-2 text-[28px]'>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-md ${i === 4 ? 'flex items-center justify-center border-2 border-black bg-purple-400 px-2 text-center font-bold text-black' : 'bg-red-100'} `}
            >
              {i === 4 && (
                <Text>
                  2025년 <br />
                  성장의 해로 <br /> 만들기
                </Text>
              )}
            </div>
          ))}

          {/* 말풍선 */}
          <div className='absolute right-[-40%] top-[30px] flex w-[400px] items-center justify-center gap-1 rounded-full bg-white p-4 text-sm shadow'>
            <Image
              src='/images/mandalart/ai-icon.png'
              alt='ai'
              width={50}
              height={50}
            />
            <span className='text-lg'>막막하다면? AI가 도와드릴게요!</span>
          </div>

          {/* 작은 AI 아이콘 (왼쪽 블럭 안에) */}
          <div className='absolute left-[26%] top-[34%]'>
            <Image
              src='/images/mandalart/ai-icon.png'
              alt='ai'
              width={32}
              height={32}
            />
          </div>
        </div>

        {/* 오른쪽 텍스트 */}
        <div className='ml-8'>
          <Title as='h2' size='32px-semibold'>
            AI와 함께 완성하는 나만의 만다라트
          </Title>
          <Text size='32px-regular'>
            막연한 생각을 구체적인 계획으로 세분화하고,
            <br />
            막힐 땐 AI와 함께 설계해봐요.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MandalartExplainSection;
