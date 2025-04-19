import { create } from 'zustand';
import { RealtimeUser, UserInfoType } from './use-realtime-presence-room';
import { RealtimePresenceState } from '@supabase/supabase-js';

// 브로드캐스트 스토어 상태 타입
type useUsersStore = {
  currentUsers: Record<string, RealtimeUser>;
  leftUsers: Record<string, RealtimeUser>;
  setCurrentUsers: (
    currentUsersInfo: RealtimePresenceState<UserInfoType>
  ) => void;
  setLeftUsers: (leftUser: UserInfoType) => void;
};

/**
 * 배치업데이트를 위한 저장소(broadcastStore)를 조작하는 store
 *   - broadcastStore : 배치업데이트를 위해 변경 정보를 저장하는 객체, 렌더링에는 영향 없음
 *   - addBroadcastStore: 브로드캐스트 스토어에 데이터(payload) 추가 함수
 *   - batchUpdateSupabase: Supabase에 일괄 업데이트를 수행하는 함수
 *   - formatBroadcastStorePayload: 브로드캐스트 스토어 페이로드 형식화 함수
 */
export const useUsersStore = create<useUsersStore>((set) => ({
  currentUsers: {},
  leftUsers: {},
  /**
   * 브로드캐스트 스토어에 업데이트할 항목을 추가하는 함수
   * @param payload - 저장할 항목 데이터
   */
  setCurrentUsers: (currentUsersInfo) => {
    //현재 접속한 사람
    const formattingAllUsersInfo = Object.fromEntries(
      Object.entries(currentUsersInfo).map(([key, values]) => [
        key,
        { name: values[0].name, image: values[0].image },
      ])
    );
    set((store) => {
      const updatedLeftUsers = { ...store.leftUsers };
      const currentUserNames = new Set(
        Object.values(formattingAllUsersInfo).map((user) => user.name)
      );

      Object.entries(updatedLeftUsers).forEach(([key, user]) => {
        if (currentUserNames.has(user.name)) {
          delete updatedLeftUsers[key]; // 이름이 중복되는 사용자 제거
        }
      });

      return {
        currentUsers: formattingAllUsersInfo,
        leftUsers: updatedLeftUsers,
      };
    });
  },

  setLeftUsers: (leftUser) => {
    set((store) => {
      const updatedLeftUsers = {
        ...store.leftUsers,
        [leftUser.presence_ref]: {
          name: leftUser.name,
          image: leftUser.image,
        },
      };
      return { leftUsers: updatedLeftUsers };
    });
  },
}));
