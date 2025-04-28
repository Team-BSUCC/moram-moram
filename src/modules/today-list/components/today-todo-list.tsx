'use client';

import { useState, useEffect, useMemo } from 'react';
import MandalartTitleTab from '@/modules/today-list/components/mandalart-title-tab';
import OrderOptionSelection from '@/modules/today-list/components/order-option-selection';
import Title from '@/components/commons/title';
import Spacer from '@/components/commons/spacer';
import { filterByCompletionStatus } from '@/modules/calendar/utils/filter-by-completion-status';
import { getBorderColorWithNumber } from '@/shared/utils/get-color-with-number';
import { flattenTodos } from '../utils/flatten-todos';
import {
  FlatTodo,
  MandalartType,
  MyMandalartsType,
} from '../types/today-list-type';
import { groupBy } from '../utils/group-by';
import { AnimatePresence } from 'framer-motion';
import TodoItem from '@/components/commons/todo-item';

type TodayTodoListProps = {
  myMandalarts: MyMandalartsType;
};

const TodayTodoList = ({ myMandalarts }: TodayTodoListProps) => {
  const [clickedTitle, setClickedTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('all');

  // 최초 클릭된 만다라트 제목 세팅
  useEffect(() => {
    if (myMandalarts && myMandalarts.length > 0) {
      setClickedTitle(myMandalarts[0].core.id);
    }
  }, []);

  // 선택된 만다라트의 평탄화된 todo 목록
  const flatTodos = useMemo(() => {
    const mandalart = myMandalarts?.find(
      (mandalart: MandalartType) => mandalart.core.id === clickedTitle
    );
    if (!mandalart) return [];
    return flattenTodos(mandalart);
  }, [myMandalarts, clickedTitle]);

  // 필터링된 todo만 추출(완료한 일, 남은 할 일, 전체 보기 기준)
  // 레이아웃이 변경되지 않도록 대주제 > 소주제 > todo 순 정렬
  const filteredTodos = flatTodos
    ?.filter((todo) => filterByCompletionStatus(todo, selectedOption))
    .sort((a, b) => {
      if (a.topicId !== b.topicId) {
        return a.topicId.localeCompare(b.topicId);
      }
      if (a.subtopicId !== b.subtopicId) {
        return a.subtopicId.localeCompare(b.subtopicId);
      }
      return a.todoId.localeCompare(b.todoId);
    });

  // 대주제 id를 기준으로 그룹핑
  const groupedByTopic = (() => {
    const obj: { [topicId: string]: FlatTodo[] } = {};
    filteredTodos?.forEach((todo) => {
      if (!obj[todo.topicId]) obj[todo.topicId] = [];
      obj[todo.topicId].push(todo);
    });
    return obj;
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
                id={mandalart.core.id}
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

          <div className='w-full animate-fade-in-left'>
            <div className='mt-2 flex w-full flex-col gap-11'>
              {filteredTodos ? (
                Object.entries(groupedByTopic).map(([topicId, todos]) => (
                  <div
                    key={topicId}
                    className={`w-full border-l-8 ${getBorderColorWithNumber(todos[0].topicColor)} rounded-br-md rounded-tr-md bg-white-light p-6 shadow-md`}
                  >
                    {/* 만다라트 편집 페이지에서 빈칸 예외처리가 되면 삭제할 예정 */}
                    <Title as='h2' size='24px-semibold'>
                      {todos[0].topicTitle || '작성된 대주제가 없습니다'}
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
                              {subTodos[0].subtopicContent ||
                                '작성된 소주제가 없습니다'}
                            </Title>
                            <Spacer size='sm' />
                            <div className='flex flex-col gap-5'>
                              <AnimatePresence>
                                {subTodos.map((todo) => (
                                  <TodoItem
                                    todo={todo}
                                    showDate={true}
                                    key={todo.todoId}
                                  />
                                ))}
                              </AnimatePresence>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))
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
