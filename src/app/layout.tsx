import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import SessionInit from '@/modules/auth/components/session-init';
import TQProvider from '@/providers/tq-provider';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import { updateAuthMetadataAvatar } from '@/shared/utils/avatar-utils';

export const metadata: Metadata = {
  title: '모람모람',
  description:
    '오타니 쇼헤이가 목표를 이루기 위해 제작한 만다라트 표를 간단히 제작하고 세부사항을 todo로 관리하여 당신의 목적을 달성하세요!',
  // openGraph:
};

const pretendard = localFont({
  src: '../../public/fonts/pretendard-variable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();
  if (user) {
    await updateAuthMetadataAvatar(user.id);
  }

  return (
    <html lang='ko-KR' className='h-full w-full'>
      <body
        className={`${pretendard.variable} flex h-full w-full flex-col antialiased`}
      >
        <SessionInit />

        <header className='fixed left-0 right-0 top-0 z-50 h-[72px] w-screen lg:h-[100px]'>
          <Header user={user} />
        </header>

        <main className='mt-[72px] flex-grow lg:mt-[100px]'>
          <div className='flex flex-1 items-center justify-center'>
            {/* children에 메인 영역이 위치합니다. 중앙 70%의 영역만 차지합니다 */}
            <div className='h-full w-full'>
              <TQProvider>{children}</TQProvider>
            </div>
          </div>
        </main>
        <footer className='border-lightgray w-full border-t bg-white-light py-8'>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
