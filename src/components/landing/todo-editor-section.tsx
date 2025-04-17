import Image from 'next/image';
import Spacer from '../commons/spacer';

const TodoEditorSection = () => {
  return (
    <section className='flex min-h-screen w-full flex-col justify-center'>
      {/*텍스트 영역*/}
      <div className='mx-auto flex w-full max-w-screen-xl items-center justify-evenly gap-10 lg:flex-row'>
        <div className='w-full max-w-md text-left'>
          <h2 className='mb-2 text-[32px] font-bold'>
            각 칸을 클릭하면 투두리스트로 연결
          </h2>
          <Spacer size='xl' />
          <p className='text-[28px]'>
            중심 목표부터 세부 계획까지 보기 쉽게 시각적으로 정리해요.
          </p>
        </div>
        {/*이미지 영역*/}
        <div className='w-full max-w-lg'>
          <Image
            src='/images/todo/todo.png'
            width={500}
            height={500}
            alt='todo 예시'
          />
        </div>
      </div>
    </section>
  );
};

export default TodoEditorSection;
