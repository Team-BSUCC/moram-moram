'use client';
/* eslint-disable indent */

import { useEffect, useState } from 'react';
import { getSelectedLabel } from '@/modules/today-list/utils/get-selected-label';
import { useGetMyMandalartsQuery } from '@/shared/hooks/use-get-my-mandalarts-query';
import Button from '@/components/commons/button';
import Dropdown from '@/components/commons/drop-down';
import Spacer from '@/components/commons/spacer';
import Text from '@/components/commons/text';
import Title from '@/components/commons/title';
import TodoItem from '@/modules/today-list/components/todo-item';
import clsx from 'clsx';

const TodayListPage = () => {
  const { data, isPending } = useGetMyMandalartsQuery();
  const [clickedTitle, setClickedTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const handleSelectOption = (label: string) => {
    switch (label) {
      case 'left':
        setSelectedOption('left');
        break;
      case 'done':
        setSelectedOption('done');
        break;
      case 'all':
        setSelectedOption('all');
        break;
    }
  };

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
    <div className='mb-[72px] h-full w-full bg-white-dark'>
      <div className='mx-auto flex w-2/3 flex-col items-start'>
        <Spacer size='top' />
        <Title as='h1' size='32px-semibold'>
          투두 모아보기
        </Title>
        <Text size='20px-regular' textColor='sub'>
          내 만다라트 별 TO DO LIST를 한번에 확인하세요.
        </Text>
        <Spacer size='lg' />

        {/* 만다라트 제목 탭 */}
        <div className='mb-5 flex gap-4'>
          {data?.map((topic) => (
            <button
              key={crypto.randomUUID()}
              onClick={() => handleClick(topic.title)}
            >
              <div
                className={clsx(
                  'border-b-[2px] px-[2px] py-[10px]',
                  topic.title === clickedTitle
                    ? 'border-main'
                    : 'border-white-dark'
                )}
              >
                <Text size='24px-semibold'>{topic.title}</Text>
              </div>
            </button>
          ))}
        </div>

        {/* 셀렉트 박스 */}
        <div className='flex w-full items-center justify-end'>
          <Dropdown
            selection
            text={<Text>{getSelectedLabel(selectedOption)}</Text>}
          >
            <Button variant='none' onClick={() => handleSelectOption('left')}>
              남은 할 일
            </Button>
            <Button variant='none' onClick={() => handleSelectOption('done')}>
              완료한 일
            </Button>
            <Button variant='none' onClick={() => handleSelectOption('all')}>
              전체 보기
            </Button>
          </Dropdown>
        </div>

        {/* 투두 출력 */}
        <div className='w-full'>
          <div className='mt-2 flex w-full flex-col gap-11'>
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
                  <Title as='h2' size='24px-semibold'>
                    {topic.title}
                  </Title>
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
                          <Title
                            as='h3'
                            size='18px-semibold'
                            textColor='sub'
                            highlightColor={8}
                          >
                            {sub.title}
                          </Title>
                          <Spacer size='sm' />
                          <div className='flex flex-col gap-5'>
                            {sub.todos
                              .filter((todo) => {
                                if (selectedOption === 'left')
                                  return !todo.isDone;
                                if (selectedOption === 'done')
                                  return todo.isDone;
                                return true;
                              })
                              .map((todo) => (
                                <TodoItem
                                  todo={todo}
                                  key={crypto.randomUUID()}
                                />
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
