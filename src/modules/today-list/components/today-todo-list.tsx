'use client';

import { useState, useEffect, useMemo } from 'react';
import MandalartTitleTab from '@/modules/today-list/components/mandalart-title-tab';
import OrderOptionSelection from '@/modules/today-list/components/order-option-selection';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import TodoItem from '@/modules/today-list/components/todo-item';
import { filterByCompletionStatus } from '@/modules/calendar/utils/filter-by-completion-status';
import { getBorderColorWithNumber } from '@/shared/utils/get-color-with-number';
import { flattenTodos } from '../utils/flatten-todos';
import {
  FlatTodo,
  MandalartType,
  MyMandalartsType,
} from '../types/today-list-type';
import { groupBy } from '../utils/group-by';

type TodayTodoListProps = {
  myMandalarts: MyMandalartsType;
};

const TodayTodoList = ({ myMandalarts }: TodayTodoListProps) => {
  const [clickedTitle, setClickedTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  // 최초 클릭된 만다라트 제목 세팅
  useEffect(() => {
    if (myMandalarts && myMandalarts.length > 0) {
      setClickedTitle(myMandalarts[0].core.title);
    }
  }, []);

  // 선택된 만다라트의 평탄화된 todo 목록
  const flatTodos = useMemo(() => {
    const mandalart = myMandalarts?.find(
      (mandalart: MandalartType) => mandalart.core.title === clickedTitle
    );
    if (!mandalart) return [];
    return flattenTodos(mandalart);
  }, [myMandalarts, clickedTitle]);

  // 필터링된 todo만 추출(완료한 일, 남은 할 일, 전체 보기 기준)
  // 토픽순으로 정렬
  const filteredTodos = flatTodos
    ?.filter((todo) => filterByCompletionStatus(todo, selectedOption))
    .sort((a, b) => a.topicId.localeCompare(b.topicId));

  // 대주제 id를 기준으로 그룹핑
  const groupedByTopic = (() => {
    const map: { [topicId: string]: FlatTodo[] } = {};
    filteredTodos?.forEach((todo) => {
      if (!map[todo.topicId]) map[todo.topicId] = [];
      map[todo.topicId].push(todo);
    });
    return map;
  })();

  return (
    <div className='h-full w-full'>
      {/* 투두가 없을 때 */}
      {!myMandalarts || myMandalarts.length === 0 ? (
        <div className='flex h-full w-full items-center justify-center py-40'>
          <Title as='h2' size='20px-medium' textColor='caption'>
            아직 생성된 투두 리스트가 없어요.
          </Title>
        </div>
      ) : (
        // 투두가 있을 때
        <div>
          <div className='scrollbar-hide flex flex-nowrap gap-4 overflow-x-auto whitespace-nowrap'>
            {myMandalarts?.map((mandalart: MandalartType) => (
              <MandalartTitleTab
                key={mandalart.core.id}
                title={mandalart.core.title}
                value={clickedTitle}
                handleClick={setClickedTitle}
              />
            ))}
          </div>
          <OrderOptionSelection
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <div className='w-full'>
            <div className='mt-2 flex w-full flex-col gap-11'>
              {filteredTodos ? (
                Object.entries(groupedByTopic).map(
                  ([topicId, todos], topicIdx) => (
                    <div
                      key={topicId}
                      className={`w-full border-l-8 ${getBorderColorWithNumber(topicIdx)} rounded-br-md rounded-tr-md bg-white-light p-6 shadow-md`}
                    >
                      <Title as='h2' size='24px-semibold'>
                        {todos[0].topicTitle}
                      </Title>
                      <Spacer size={'md'} />
                      <div className='space-y-6'>
                        {/* 소주제별로 그룹핑 */}
                        {Object.entries(groupBy(todos, 'subtopicId')).map(
                          ([subtopicId, subTodos]) => (
                            <div key={subtopicId}>
                              <Title
                                as='h3'
                                size='18px-semibold'
                                textColor='sub'
                                highlightColor={8}
                              >
                                {subTodos[0].subtopicContent || '\u00A0'}
                              </Title>
                              <Spacer size='sm' />
                              <div className='flex flex-col gap-5'>
                                {subTodos.map((todo) => (
                                  <TodoItem todo={todo} key={todo.todoId} />
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className='flex h-full w-full items-center justify-center py-40'>
                  <Title as='h2' size='20px-medium' textColor='caption'>
                    만다라트를 달성하기 위한 투두리스트를 작성해주세요.
                  </Title>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayTodoList;
