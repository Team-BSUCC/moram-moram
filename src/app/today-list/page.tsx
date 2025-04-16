'use client';

import Button from '@/components/commons/button';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import { useFetchCalendarQuery } from '@/modules/calendar/hooks/use-fetch-calendar-query';
import { useEffect, useState } from 'react';

const TodayListPage = () => {
  const { data, isPending } = useFetchCalendarQuery();
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
    <div className='flex w-full flex-col items-start'>
      <Spacer size={'2xl'} />
      <Title as='h1'>투두 모아보기</Title>
      <Text>내 만다라트 별 TO DO LIST를 한번에 확인하세요.</Text>
      <Spacer size={'lg'} />

      {/* 만다라트 제목 탭 */}
      <div className='mb-5 flex gap-4'>
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
      <div>
        <select
          name='todoListView'
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
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
                className='bg-gray-50 w-full border-l-8 border-yellow-400 p-6'
              >
                <Title as='h3'>{topic.title}</Title>
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
                        <Title as='h4' highlightColor='bg-red-500'>
                          {sub.title}
                        </Title>
                        <Spacer size={'md'} />
                        {sub.todos
                          .filter((todo) => {
                            if (selectedOption === 'left') return !todo.isDone;
                            if (selectedOption === 'done') return todo.isDone;
                            return true;
                          })
                          .map((todo, todoIdx) => (
                            <div key={todoIdx} className='ml-1 mt-3 space-y-1'>
                              <div className='w-full border-b border-[#D2D2D2] pb-1 text-[16px] font-medium'>
                                {todo.title}
                              </div>
                              <div className='text-sm text-[#5E5E5E]'>
                                {todo.createdAt.slice(0, 10)}
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodayListPage;
