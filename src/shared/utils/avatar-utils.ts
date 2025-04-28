import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE!
);

export const updateAuthMetadataAvatar = async (userId: string) => {
  const { data: userProfile, error: getProfile } = await supabaseAdmin
    .from('users')
    .select('profile_url')
    .eq('id', userId)
    .single();
  if (getProfile) {
    throw new Error(getProfile.message);
  }

  const { error: updateAvatar } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: {
        avatar_url: userProfile?.profile_url,
      },
    }
  );
  if (updateAvatar) {
    throw new Error(updateAvatar.message);
  }
};

export const timeStamp = (url: string) => {
  return `${url}?t=${Date.now()}`;
};
