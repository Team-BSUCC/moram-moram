'use server';

import {
  deleteUserAvatar,
  updateUserNickname,
} from '../services/user-profile-service';

export const deleteAvatar = async (userId: string) => {
  return await deleteUserAvatar(userId);
};

export const updateNickname = async (userId: string, nickname: string) => {
  return await updateUserNickname(userId, nickname);
};
