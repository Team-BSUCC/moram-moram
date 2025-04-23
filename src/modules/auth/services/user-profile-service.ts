'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE!
);

export const updateUserAvatar = async (userId: string, file: File) => {
  const ext = file.name.split('.').pop();
  const filePath = `avatars/${userId}/profile.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabaseAdmin.storage.from('avatars').getPublicUrl(filePath);
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { avatar_url: publicUrl },
    }
  );

  if (updateError) throw new Error(updateError.message);

  return publicUrl;
};

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
};

export const updateUserNickname = async (userId: string, nickname: string) => {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: { nickname },
  });

  if (error) throw new Error(error.message);
};
