import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartCalendar from '@/modules/calendar/components/mandalart-calendar';

const CalendarPage = async () => {
  const user = await getUserInfo();

  return <MandalartCalendar user={user} />;
};

export default CalendarPage;
