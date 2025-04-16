import { NextResponse } from 'next/server';

import { getServerClient } from '@/shared/utils/supabase/server-client';
import {
  CoreTempType,
  ProcessedDataType,
  RoomFetchType,
  SubtopicTempType,
  TodoTempType,
  TopicTempType,
} from '@/modules/calendar/type/fetch-calendar-type';

export async function GET() {
  const supabase = getServerClient();

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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || !Array.isArray(data)) {
    return NextResponse.json([], { status: 200 });
  }

  const processedData: ProcessedDataType = [];

  const isValidRoom = (room: unknown): room is RoomFetchType => {
    return (
      typeof room === 'object' &&
      room !== null &&
      'id' in room &&
      'mandalarts' in room &&
      Array.isArray((room as RoomFetchType).mandalarts)
    );
  };

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
              todos: sub.cell_todos.map(
                (todo): TodoTempType => ({
                  title: todo.title,
                  isDone: todo.is_done,
                  createdAt: todo.created_at,
                })
              ),
            };

            topicGroup.subtopics.push(subtopic);
          });

          core.topics.push(topicGroup);
        });

        processedData.push(core);
      });
    }
  });

  return NextResponse.json(processedData);
}
