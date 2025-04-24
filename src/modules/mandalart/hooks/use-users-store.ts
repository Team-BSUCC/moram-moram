import { create } from 'zustand';
import { RealtimeUser, UserInfoType } from './use-realtime-presence-room';
import { RealtimePresenceState } from '@supabase/supabase-js';

// 브로드캐스트 스토어 상태 타입
type useUsersStore = {
  currentUsers: RealtimeUser[];
  leftUsers: RealtimeUser[];
  setCurrentUsers: (
    currentUsersInfo: RealtimePresenceState<UserInfoType>
  ) => void;
  setLeftUsers: (leftUser: UserInfoType) => void;
};

export const useUsersStore = create<useUsersStore>((set) => ({
  currentUsers: [],
  leftUsers: [],
  setCurrentUsers: (currentUsersInfo) => {
    // 현재 접속한 사람들을 배열로 변환

    const formattingAllUsersInfo = Array.from(
      new Map(
        Object.values(currentUsersInfo).map((values) => [
          values[0].name,
          {
            name: values[0].name,
            image: values[0].image,
          },
        ])
      ).values()
    );

    set((store) => {
      // 현재 사용자 이름들의 집합
      const currentUserNames = new Set(
        formattingAllUsersInfo.map((user) => user.name)
      );

      // 이름이 중복되지 않는 leftUsers만 필터링
      const updatedLeftUsers = store.leftUsers.filter(
        (user) => !currentUserNames.has(user.name)
      );

      return {
        currentUsers: formattingAllUsersInfo,
        leftUsers: updatedLeftUsers,
      };
    });
  },

  setLeftUsers: (leftUser) => {
    set((store) => {
      // 간단히 배열에 추가만 수행
      const updatedLeftUsers = [
        ...store.leftUsers,
        {
          name: leftUser.name,
          image: leftUser.image,
        },
      ];

      return { leftUsers: updatedLeftUsers };
    });
  },
}));
