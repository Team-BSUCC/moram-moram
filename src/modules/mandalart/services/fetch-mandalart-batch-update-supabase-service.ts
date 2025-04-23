import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import { BroadcastStoreType } from '../types/realtime-type';

/**
 * 브로드캐스트 스토어의 데이터를 Supabase에 일괄 업데이트하는 함수
 * Topic, SubTopic, Todo 데이터를 각각 처리하여 병렬로 요청을 실행합니다
 * @param broadcastStore - 업데이트할 데이터가 포함된 브로드캐스트 스토어
 * @throws 하나 이상의 요청이 실패할 경우 에러를 발생시킵니다
 */
export const mandalartBatchUpdateSupabase = async (
  broadcastStore: BroadcastStoreType
) => {
  const supabase = getBrowserClient();
  //일괄요청을 위한 배열,
  const updates = [];

  //Core 업데이트(update)
  if (broadcastStore.core.size > 0) {
    const coreData = Array.from(broadcastStore.core.entries())[0];
    const coreUpdate = supabase
      .from('mandalarts')
      .update({ title: coreData[1].value })
      .eq('id', coreData[0]);
    updates.push(coreUpdate);
  }

  // Topic 업데이트(upsert)
  if (broadcastStore.topic.size > 0) {
    const topicData = Array.from(broadcastStore.topic.values());
    const topicUpdate = supabase.from('mandalart_topics').upsert(
      topicData.map((payloadTopic) => {
        const {
          category,
          mandalart_subtopics,
          content,
          isCenter,
          value,
          ...topicRowInfo
        } = payloadTopic;
        return { ...topicRowInfo, topic: value };
      })
    );
    updates.push(topicUpdate);
  }

  // SubTopic 업데이트(upsert)
  if (broadcastStore.subTopic.size > 0) {
    const subTopicData = Array.from(broadcastStore.subTopic.values());
    const subTopicUpdate = supabase.from('mandalart_subtopics').upsert(
      subTopicData.map((payloadSubtopic) => {
        const { category, cell_todos, isCenter, value, ...subtopicRowInfo } =
          payloadSubtopic;
        return { ...subtopicRowInfo, content: value };
      })
    );
    updates.push(subTopicUpdate);
  }

  // Todo 업데이트(upsert,delete)
  if (broadcastStore.todo.size > 0) {
    const todoData = Array.from(broadcastStore.todo.values());
    const todoTable = supabase.from('cell_todos');

    //todo upsert를 위한 객체 배열 생성
    const upsertData = todoData
      .filter((payloadTodo) => payloadTodo.action !== 'DELETE')
      .map((payloadTodo) => {
        //category 사용 X
        const { category, value, action, ...todoRowInfo } = payloadTodo;
        return { ...todoRowInfo, title: value };
      });

    //todo delete를 위한 id 배열 생성
    const deleteTodoId = todoData
      .filter((payloadTodo) => payloadTodo.action === 'DELETE')
      .map((payloadTodo) => payloadTodo.id);

    if (upsertData.length !== 0) {
      const todoUpsert = todoTable.upsert(upsertData);
      updates.push(todoUpsert);
    }
    if (deleteTodoId.length !== 0) {
      const todoDelete = todoTable.delete().in('id', deleteTodoId);
      updates.push(todoDelete);
    }
  }

  //일괄요청
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
