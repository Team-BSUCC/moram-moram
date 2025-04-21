import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import MandalartCalendar from '@/modules/calendar/components/mandalart-calendar';
import { getServerClient } from '@/shared/utils/supabase/server-client';

const CalendarPage = async () => {
  const supabase = getServerClient();
  const user = await getUserInfo();
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { data: myMandalarts, error } = await supabase.rpc(
    'get_all_mandalarts_by_user',
    { _user_id: user.id }
  );

  if (error) {
    /**
     * @todo: sentry 도입
     */
    throw new Error('Failed to fetch mandalarts');
  }

  return <MandalartCalendar myMandalarts={myMandalarts} />;
};

export default CalendarPage;
