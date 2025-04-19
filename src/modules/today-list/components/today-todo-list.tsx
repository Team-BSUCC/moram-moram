'use client';

import { useState, useEffect } from 'react';
import MandalartTitleTab from '@/modules/today-list/components/mandalart-title-tab';
import OrderOptionSelection from '@/modules/today-list/components/order-option-selection';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import TodoItem from '@/modules/today-list/components/todo-item';
import { filterByCompletionStatus } from '@/modules/calendar/utils/filter-by-completion-status';
import { ProcessedDataType } from '@/modules/calendar/type/fetch-calendar-type';
import { getBorderColorWithNumber } from '@/shared/utils/get-color-with-number';

type TodayTodoListProps = {
  initialMandalarts: ProcessedDataType;
};

const TodayTodoList = ({ initialMandalarts }: TodayTodoListProps) => {
  const [clickedTitle, setClickedTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  // 초기 클릭된 제목 설정
  useEffect(() => {
    if (initialMandalarts && initialMandalarts.length > 0) {
      setClickedTitle(initialMandalarts[0].title);
    }
  }, [initialMandalarts]);

  const handleClick = (title: string) => {
    setClickedTitle(title);
  };

  return (
    <>
      {/* 만다라트 제목 탭 */}
      <div className='mb-5 flex gap-4'>
        {initialMandalarts?.map((topic, idx) => (
          <MandalartTitleTab
            key={idx}
            title={topic.title}
            value={clickedTitle}
            handleClick={handleClick}
          />
        ))}
      </div>

      {/* 셀렉트 박스 */}
      <OrderOptionSelection
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* 투두 출력 */}
      <div className='w-full'>
        <div className='mt-2 flex w-full flex-col gap-11'>
          {initialMandalarts
            ?.find((mandalart) => mandalart.title === clickedTitle)
            ?.topics.filter((topic) =>
              topic.subtopics.some((sub) =>
                sub.todos.some((todo) =>
                  filterByCompletionStatus(todo, selectedOption)
                )
              )
            )
            .map((topic, topicIdx) => (
              <div
                key={topicIdx}
                className={`w-full border-l-8 ${getBorderColorWithNumber(topicIdx)} bg-white-light p-6`}
              >
                <Title as='h2' size='24px-semibold'>
                  {topic.title}
                </Title>
                <Spacer size={'md'} />
                <div className='space-y-6'>
                  {topic.subtopics
                    .filter((sub) =>
                      sub.todos.some((todo) =>
                        filterByCompletionStatus(todo, selectedOption)
                      )
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
                            .filter((todo) =>
                              filterByCompletionStatus(todo, selectedOption)
                            )
                            .map((todo, todoIdx) => (
                              <TodoItem
                                todo={todo}
                                key={`${topicIdx}-${subIdx}-${todoIdx}`}
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
    </>
  );
};

export default TodayTodoList;
