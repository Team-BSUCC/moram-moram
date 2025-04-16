'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { useFetchCalendarQuery } from '@/modules/calendar/hooks/use-fetch-calendar-query';
import { useState } from 'react';

const TodayListPage = () => {
  const { data, isPending } = useFetchCalendarQuery();
  // 초기값으로 가장 앞의 만다라트 제목 넣기
  const [clickedTitle, setClickedTitle] = useState<string>('');

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleClick = (title: string) => {
    setClickedTitle(title);
  };

  return (
    <div className='flex w-full flex-col items-start'>
      <Spacer size={'2xl'} />
      <Title as='h1'>투두 모아보기</Title>
      <Text>내 만다라트 별 TO DO LIST를 한번에 확인하세요.</Text>
      <Spacer size={'xl'} />
      {/* 투두 목록을 표시할 만다라트 선택창 */}
      <div className='mb-5 flex gap-2'>
        {data?.map((topic, idx) => (
          <Button key={idx} onClick={() => handleClick(topic.title)}>
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
      <div className='flex items-end'>
        <select name='' id=''>
          <option value=''>남은 할 일</option>
          <option value=''>완료한 일</option>
          <option value=''>전체 보기</option>
        </select>
      </div>

      {/* 할 일 목록 */}
      <div className='w-full'>
        <div className='mt-6 w-full space-y-4'>
          <div className='mt-6 w-full space-y-6'>
            {data
              ?.find((mandalart) => mandalart.title === clickedTitle)
              ?.topics.map((topic, topicIdx) => (
                <div
                  key={topicIdx}
                  className='bg-gray-50 w-full border-l-4 border-yellow-400 p-6'
                >
                  <Title as='h3'>{topic.title}</Title>
                  <Spacer size={'xl'} />
                  <div className='space-y-4'>
                    {topic.subtopics.map((sub, subIdx) =>
                      sub.todos.map((todo, todoIdx) => (
                        <div key={`${subIdx}-${todoIdx}`} className='space-y-1'>
                          <div className='w-full border-b-[1px] border-[#D2D2D2] font-semibold'>
                            {todo.title}
                          </div>
                          <div className='text-sm text-[#5E5E5E]'>
                            {sub.title} / {todo.createdAt.slice(0, 10)}
                          </div>
                        </div>
                      ))
                    )}
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
