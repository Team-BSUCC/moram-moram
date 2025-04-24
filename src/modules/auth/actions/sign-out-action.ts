'use server';

import { redirect } from 'next/navigation';
import { signOut } from '@/modules/auth/services/auth-server-service';
import URL from '@/shared/constants/url-constants';

export async function signOutAction() {
  const result = await signOut();
  if (!result.error) {
    redirect(URL.HOME);
  }
}
