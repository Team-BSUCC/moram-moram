'use server';

import { timeStamp } from '@/shared/utils/avatar-utils';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE!
);

/**
 * 유저 아바타 업데이트 함수
 * @param userId
 * @param file
 * @returns
 */
export const updateUserAvatar = async (userId: string, file: File) => {
  const ext = file.name.split('.').pop();
  const filePath = `avatars/${userId}/profile-${Date.now()}.${ext}`;

  deleteUserAvatar(userId);

  const { error: uploadError } = await supabaseAdmin.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabaseAdmin.storage.from('avatars').getPublicUrl(filePath);
  const publicUrl = timeStamp(data.publicUrl);

  const { error: userError } = await supabaseAdmin
    .from('users')
    .update({ profile_url: publicUrl })
    .eq('id', userId);

  if (userError) {
    throw new Error(userError.message);
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { avatar_url: publicUrl },
    }
  );
  if (updateError) {
    throw new Error(updateError.message);
  }

  return publicUrl;
};

/**
 * 유저 아바타 삭제 함수
 * @param userId
 */
export const deleteUserAvatar = async (userId: string) => {
  const folderPath = `avatars/${userId}`;

  const { data: files, error: listError } = await supabaseAdmin.storage
    .from('avatars')
    .list(folderPath);

  if (listError) throw new Error(listError.message);

  const profileFiles = files
    ?.filter((file) => file.name.startsWith('profile'))
    .map((file) => `${folderPath}/${file.name}`);

  if (profileFiles && profileFiles.length > 0) {
    const { error: removeError } = await supabaseAdmin.storage
      .from('avatars')
      .remove(profileFiles);

    if (removeError) throw new Error(removeError.message);
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { avatar_url: '' },
    }
  );
  if (updateError) throw new Error(updateError.message);

  const { error: deleteError } = await supabaseAdmin
    .from('users')
    .update({ profile_url: null })
    .eq('id', userId);

  if (deleteError) throw new Error(deleteError.message);
};

/**
 * 유저 닉네임 변경 함수
 * @param userId
 * @param nickname
 */
export const updateUserNickname = async (userId: string, nickname: string) => {
  const { error: AuthError } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { nickname },
    }
  );
  if (AuthError) {
    throw new Error(AuthError.message);
  }

  const { error: userError } = await supabaseAdmin
    .from('users')
    .update({ nickname })
    .eq('id', userId);

  if (userError) {
    throw new Error(userError.message);
  }
};
