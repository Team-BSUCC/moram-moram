import { updateUserAvatar } from '@/modules/auth/services/user-profile-service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const userId = formData.get('userId') as string;

  if (!file || !userId) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const url = await updateUserAvatar(userId, file);
    return NextResponse.json({ url });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
};
