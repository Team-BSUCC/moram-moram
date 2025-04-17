'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { useGetMyMandalartsQuery } from '@/shared/hooks/use-get-my-mandalarts-query';
import { useEffect, useState } from 'react';

const TodayListPage = () => {
  const { data, isPending } = useGetMyMandalartsQuery();
  const [clickedTitle, setClickedTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  // 초기 클릭된 제목 설정
  useEffect(() => {
    if (data && data.length > 0) {
      setClickedTitle(data[0].title);
    }
  }, [data]);

  const handleClick = (title: string) => {
    setClickedTitle(title);
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className='h-full w-full bg-white-dark'>
      <div className='mx-auto flex w-2/3 flex-col items-start'>
        <Spacer size={'2xl'} />
        <Title as='h1'>투두 모아보기</Title>
        <Text>내 만다라트 별 TO DO LIST를 한번에 확인하세요.</Text>
        <Spacer size={'lg'} />

        {/* 만다라트 제목 탭 */}
        <div className='mb-5 flex gap-4'>
          {data?.map((topic, idx) => (
            <Button
              key={idx}
              variant={'outline'}
              onClick={() => handleClick(topic.title)}
            >
              <div
                className={
                  topic.title === clickedTitle
                    ? 'border-b-[2px] border-[#000]'
                    : 'border-b-[2px] border-[#fff]'
                }
              >
                <Title as='h2'>{topic.title}</Title>
              </div>
            </Button>
          ))}
        </div>

        {/* 셀렉트 박스 */}
        <div className='flex w-full justify-end'>
          <select
            name='todoListView'
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className='bg-transparent'
          >
            <option value='left'>남은 할 일</option>
            <option value='done'>완료한 일</option>
            <option value='all'>전체 보기</option>
          </select>
        </div>

        {/* 투두 출력 */}
        <div className='w-full'>
          <div className='mt-6 w-full space-y-4'>
            {data
              ?.find((mandalart) => mandalart.title === clickedTitle)
              ?.topics.filter((topic) =>
                topic.subtopics.some((sub) =>
                  sub.todos.some((todo) => {
                    if (selectedOption === 'left') return !todo.isDone;
                    if (selectedOption === 'done') return todo.isDone;
                    return true;
                  })
                )
              )
              .map((topic, topicIdx) => (
                <div
                  key={topicIdx}
                  className='w-full border-l-8 border-yellow-pigment bg-white-light p-6'
                >
                  <p className='text-[24px] font-semibold'>{topic.title}</p>
                  <Spacer size={'md'} />
                  <div className='space-y-6'>
                    {topic.subtopics
                      .filter((sub) =>
                        sub.todos.some((todo) => {
                          if (selectedOption === 'left') return !todo.isDone;
                          if (selectedOption === 'done') return todo.isDone;
                          return true;
                        })
                      )
                      .map((sub, subIdx) => (
                        <div key={subIdx}>
                          <p className='border-l-4 border-[#666666] px-3 text-[18px]'>
                            {sub.title}
                          </p>
                          <Spacer size={'md'} />
                          <div className='flex flex-col gap-[20px]'>
                            {sub.todos
                              .filter((todo) => {
                                if (selectedOption === 'left')
                                  return !todo.isDone;
                                if (selectedOption === 'done')
                                  return todo.isDone;
                                return true;
                              })
                              .map((todo, todoIdx) => (
                                <div
                                  key={todoIdx}
                                  className='ml-1 mt-3 space-y-1'
                                >
                                  <div className='flex w-full items-center justify-between border-b border-[#D2D2D2] pb-1 text-[20px] font-medium'>
                                    {todo.title}
                                    <div>⋮</div>
                                  </div>
                                  <div className='text-[16px] text-[#5E5E5E]'>
                                    {todo.createdAt.slice(0, 10)}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayListPage;
