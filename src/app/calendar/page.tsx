'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../styles/calendar-custom.css';
import interactionPlugin from '@fullcalendar/interaction';
import useFloatingSheetStore from '@/shared/hooks/use-floating-sheet-store';
import CalendarFloatingSheet from '@/modules/calendar/components/calendar-floating-sheet';
import { useGetMyMandalartsQuery } from '@/shared/hooks/use-get-my-mandalarts-query';

/**
 * @todo : 캘린더 UI 추가 수정
 */
const CalendarPage = () => {
  const isVisible = useFloatingSheetStore((state) => state.isVisible);
  const show = useFloatingSheetStore((state) => state.show);
  const setInfo = useFloatingSheetStore((state) => state.setInfo);

  const { data: date, isPending } = useGetMyMandalartsQuery();

  if (isPending) return <div>Loading...</div>;

  const allTodos = date?.flatMap((core) =>
    core.topics.flatMap((topic) => topic.subtopics.flatMap((sub) => sub.todos))
  );

  const events = allTodos?.map((todo) => ({
    title: todo.title,
    date: todo.createdAt,
    isDone: todo.isDone,
  }));

  // 셀 클릭 핸들러
  const handleCellClick = (dateStr: string) => {
    setInfo(dateStr);
    show();
  };

  return (
    <div className='right-0 min-h-screen w-full bg-white-dark p-8'>
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
      {isVisible && <CalendarFloatingSheet todos={date} events={events} />}
    </div>
  );
};

export default CalendarPage;
