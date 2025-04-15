import { getBrowserClient } from '@/shared/utils/supabase/browser-client';
import {
  CoreTempType,
  ProcessedDataType,
  RoomFetchType,
  SubtopicTempType,
  TodoTempType,
  TopicTempType,
} from '../type/fetch-calendar-type';

/**
 * @todo 투두 모아보기 페이지에서도 사용가능하게 수정
 * 캘린더 페이지에 사용될 투두 목록을 받아오는 함수
 * @returns 가공된 데이터
 */
export const getFetchCalendarData = async () => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase
    .from('room_participants')
    .select(
      `role,
          rooms (id, 
          mandalarts (id, title, created_at, private,
          mandalart_topics (id, topic, topic_index, created_at,
          mandalart_subtopics (id, content, cell_index, is_done, created_at,
          cell_todos (id, title, is_done, created_at)))))`
    )
    .eq('user_id', 'd2477fa0-d848-47df-a962-fdf0d46735c0');

  if (error) throw new Error(error.message);
  if (!data || !Array.isArray(data)) return [];

  const processedData: ProcessedDataType = [];

  // 타입 가드 함수
  function isValidRoom(room: unknown): room is RoomFetchType {
    return (
      typeof room === 'object' &&
      room !== null &&
      'id' in room &&
      'mandalarts' in room &&
      Array.isArray((room as RoomFetchType).mandalarts)
    );
  }

  // 데이터 가공 과정
  // 핵심주제 > 대주제 > 소주제 > 투두 순의 배열 안 객체를 생성
  data.forEach((participant) => {
    const room = participant.rooms;

    if (isValidRoom(room)) {
      room.mandalarts.forEach((mandalart) => {
        const core: CoreTempType = {
          title: mandalart.title,
          topics: [],
        };

        mandalart.mandalart_topics.forEach((topic) => {
          const topicGroup: TopicTempType = {
            title: topic.topic,
            subtopics: [],
          };

          topic.mandalart_subtopics.forEach((sub) => {
            const subtopic: SubtopicTempType = {
              title: sub.content,
              isDone: sub.is_done,
              todos: [],
            };

            subtopic.todos = sub.cell_todos.map(
              (todo): TodoTempType => ({
                title: todo.title,
                isDone: todo.is_done,
                createdAt: todo.created_at,
              })
            );

            topicGroup.subtopics.push(subtopic);
          });

          core.topics.push(topicGroup);
        });

        processedData.push(core);
      });
    }
  });

  return processedData;
};
