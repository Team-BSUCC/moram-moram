import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { MutableRefObject } from 'react';
import { BroadcastStoreType } from '../hooks/use-realtime-broadcast-batch';

/**
 * 브로드캐스트 스토어의 데이터를 Supabase에 일괄 업데이트하는 함수
 * Topic, SubTopic, Todo 데이터를 각각 처리하여 병렬로 요청을 실행합니다
 * @param broadcastStore - 업데이트할 데이터가 포함된 브로드캐스트 스토어
 * @throws 하나 이상의 요청이 실패할 경우 에러를 발생시킵니다
 */
export const mandalartBatchUpdateSupabase = async (
  broadcastStore: MutableRefObject<BroadcastStoreType>
) => {
  const supabase = getBrowserClient();
  //일괄요청을 위한 배열,
  const updates = [];

  // Topic 업데이트
  if (broadcastStore.current.topic.size > 0) {
    const topicData = Array.from(broadcastStore.current.topic.values());
    const topicUpdate = supabase.from('mandalart_topics').upsert(
      topicData.map((payloadTopic) => {
        //eslint-disable-next-line no-unused-vars
        const { category, value, ...topicRowInfo } = payloadTopic;
        return { ...topicRowInfo, topic: value };
      })
    );
    updates.push(topicUpdate);
  }

  // SubTopic 업데이트
  if (broadcastStore.current.subTopic.size > 0) {
    const subTopicData = Array.from(broadcastStore.current.subTopic.values());
    const subTopicUpdate = supabase.from('mandalart_subtopics').upsert(
      subTopicData.map((payloadSubtopic) => {
        //eslint-disable-next-line no-unused-vars
        const { category, value, ...subtopicRowInfo } = payloadSubtopic;
        return { ...subtopicRowInfo, content: value };
      })
    );
    updates.push(subTopicUpdate);
  }

  // Todo 업데이트(upsert와 delete 구분)
  if (broadcastStore.current.todo.size > 0) {
    const todoData = Array.from(broadcastStore.current.todo.values());
    const deleteTodoId: string[] = [];

    const todoTable = supabase.from('cell_todos');
    const todoUpdate = todoTable.upsert(
      todoData
        .filter((payloadTodo) => {
          //action이 "DELETE"면 삭제요청에 쓰일 배열에 id 삽입
          if (payloadTodo.action === 'DELETE') {
            deleteTodoId.push(payloadTodo.id);
          }
          //action이 'CREATE', 'UPDATE'일 경우 upsert요청에 쓰일 객체만드는 배열로 변환
          return (
            payloadTodo.action === 'CREATE' || payloadTodo.action === 'UPDATE'
          );
        })
        .map((payloadTodo) => {
          //eslint-disable-next-line no-unused-vars
          const { category, value, ...todoRowInfo } = payloadTodo;
          return { ...todoRowInfo, title: value };
        })
    );
    const todoDelete = todoTable.delete().in('id', deleteTodoId);

    //upsert요청, delete요청이 있으면 updates에 추가
    if (todoData.length !== deleteTodoId.length) {
      updates.push(todoUpdate);
    }
    if (deleteTodoId.length !== 0) {
      updates.push(todoDelete);
    }
  }

  if (updates.length > 0) {
    //수파베이스 쿼리문 병렬 실행
    const results = await Promise.allSettled(updates);

    // 에러 확인
    const errors = results
      .filter(
        (result): result is PromiseRejectedResult =>
          result.status === 'rejected'
      )
      .map((result) => result.reason);

    //에러가 하나라도 있으면 리젝트
    //리젝트시 브로드캐스트 스토어 초기화 안됨
    if (errors.length > 0) {
      throw new Error(`일부 업데이트 실패: ${errors.join(', ')}`);
    }
  }
};
