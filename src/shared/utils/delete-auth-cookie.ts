'use server';

import { cookies } from 'next/headers';

export const deleteAuthCookies = async () => {
  const allCookies = cookies().getAll();

  console.log('hi');

  allCookies
    .filter((c) => c.name.startsWith('sb-') && c.name.includes('-auth-token'))
    .forEach((c) => {
      cookies().delete(c.name);
    });

  allCookies
    .filter(
      (c) => c.name.startsWith('sb-') && c.name.includes('-refresh-token')
    )
    .forEach((c) => {
      cookies().delete(c.name);
    });
};
