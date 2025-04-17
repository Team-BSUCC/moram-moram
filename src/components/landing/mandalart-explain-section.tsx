import Image from 'next/image';

const MandalartExplainSection = () => {
  return (
    <section className='flex min-h-screen w-full flex-col justify-center'>
      <div className='flex items-center justify-evenly'>
        {/* 왼쪽: 만다라트 3x3 */}
        <div className='relative grid h-[600px] w-[600px] grid-cols-3 grid-rows-3 gap-2 text-[28px]'>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-md ${i === 4 ? 'flex items-center justify-center border-2 border-black bg-purple-400 px-2 text-center font-bold text-black' : 'bg-red-100'} `}
            >
              {i === 4 && (
                <span>
                  2025년 <br />
                  성장의 해로 <br /> 만들기
                </span>
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
          <h1 className='mb-2 text-[36px] font-bold'>
            AI와 함께 완성하는 나만의 만다라트
          </h1>
          <p className='text-[32px] leading-relaxed'>
            막연한 생각을 구체적인 계획으로 세분화하고,
            <br />
            막힐 땐 AI와 함께 설계해봐요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MandalartExplainSection;
