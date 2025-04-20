import { RealtimePresenceState } from '@supabase/supabase-js';

export const checkUserJoinTime = (
  allUsersInfo: RealtimePresenceState<{
    image: string;
    name: string;
    joinTime: number;
  }>,
  myJoinTime: number
) => {
  //가장 먼저 들어온 유저의 접속시간 찾기
  const usersJoinTimeArr = Object.values(allUsersInfo)
    .filter((userInfo) => userInfo[0].joinTime)
    .map((userInfo) => {
      return userInfo[0].joinTime;
    });

  const firstUserJoinTime = Math.min(...usersJoinTimeArr);
  const newUserJoinTime = Math.max(...usersJoinTimeArr);

  const isNewUser =
    usersJoinTimeArr.length !== 1 && newUserJoinTime === myJoinTime;

  return { firstUserJoinTime, newUserJoinTime, isNewUser };
};
