'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import './calendar-custom.css';
import interactionPlugin from '@fullcalendar/interaction';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import CalendarFloatingSheet from '@/modules/calendar/components/calendar-floating-sheet';
import { getBrowserClient } from '@/shared/utils/supabase/browser-client';

/**
 *@todo : 캘린더 UI 추가 수정
 *@todo : 어떤식으로 데이터를 가져올지 고민하기
 */
const CalendarPage = () => {
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);
  const [data, setData] = useState<any>([]);
  const [events, setEvents] = useState<any[]>([]);

  const supabase = getBrowserClient();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error }: { data: any; error: any } = await supabase
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
      if (!data || !Array.isArray(data)) return;

      const parsed: {
        title: string;
        topics: {
          title: string;
          subtopics: {
            title: string;
            isDone: boolean;
            todos: { title: string; isDone: boolean; createdAt: string }[];
          }[];
        }[];
      }[] = [];

      data.forEach((participant) => {
        participant.rooms?.mandalarts?.forEach((mandalart) => {
          const core = {
            title: mandalart.title,
            topics: [],
          };

          mandalart.mandalart_topics?.forEach((topic) => {
            const topicGroup = {
              title: topic.topic,
              subtopics: [],
            };

            topic.mandalart_subtopics?.forEach((sub) => {
              const subtopic = {
                title: sub.content,
                isDone: sub.is_done,
                todos:
                  sub.cell_todos?.map((todo) => ({
                    title: todo.title,
                    isDone: todo.is_done,
                    createdAt: todo.created_at,
                  })) ?? [],
              };

              (topicGroup.subtopics as any[]).push(subtopic);
            });

            (core.topics as any[]).push(topicGroup);
          });

          parsed.push(core);
        });
      });

      const allTodos = parsed.flatMap((core) =>
        core.topics.flatMap((topic) =>
          topic.subtopics.flatMap((sub) => sub.todos)
        )
      );

      const processedTodos = allTodos.map((todo) => ({
        title: todo.title,
        date: todo.createdAt,
        isDone: todo.isDone,
      }));

      setEvents(processedTodos);
      setData(parsed);
    };

    fetchTodos();
  }, []);

  // 셀 클릭 핸들러
  const handleCellClick = (dateStr: string) => {
    setInfo(dateStr);
    show();
  };

  return (
    <div className='min-h-screen p-8'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: '',
        }}
        dayMaxEventRows={5}
        fixedWeekCount={false}
        height='auto'
        aspectRatio={1.25}
        showNonCurrentDates={true}
        eventContent={(arg) => (
          <div className='custom-event'>{arg.event.title}</div>
        )}
        dateClick={(arg) => {
          handleCellClick(arg.dateStr);
        }}
        dayCellDidMount={(info) => {
          // 셀 전체에 클릭 이벤트 리스너 추가
          info.el.addEventListener('click', () => {
            const year = info.date.getFullYear();
            const month = String(info.date.getMonth() + 1).padStart(2, '0');
            const day = String(info.date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            handleCellClick(dateStr);
          });
        }}
        dayHeaderFormat={{ weekday: 'narrow' }}
        titleFormat={{ year: 'numeric', month: 'short' }}
        dayCellContent={({ date }) => date.getDate()}
        initialDate={new Date()}
        unselectAuto={true}
      />
      {isVisible && <CalendarFloatingSheet todos={data} events={events} />}
    </div>
  );
};

export default CalendarPage;
