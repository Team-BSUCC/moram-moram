import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import SessionInit from '@/modules/auth/components/session-init';
import TQProvider from '@/providers/tq-provider';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { getUserInfo } from '@/modules/auth/services/auth-server-service';
import { Alert } from '@/components/commons/alert';
import ErrorBoundaryWrapper from './error-boundary-wrapper';

export const metadata: Metadata = {
  title:
    'Manda-친구와 함께 만다라트로 목표를 설정하고, 세부 계획을 todo로 관리하세요!',
  description:
    '오타니 쇼헤이가 목표를 이루기 위해 제작한 만다라트 표를 간단히 제작하고, 공통 목표를 친구와 실시간으로 편집해 보세요!',
  icons: {
    icon: '/images/manda-logo.svg',
  },
  metadataBase: new URL('https://www.manda.io.kr'),
  openGraph: {
    title:
      'Manda-친구와 함께 만다라트로 목표를 설정하고, 세부 계획을 todo로 관리하세요!',
    description:
      '오타니 쇼헤이가 목표를 이루기 위해 제작한 만다라트 표를 간단히 제작하고, 공통 목표를 친구와 실시간으로 편집해 보세요!',
    url: 'https://www.manda.io.kr/',
    siteName: 'Manda',
    images: [
      {
        url: '/images/open-graph/opengraph.png',
        alt: 'Manda',
      },
    ],
    type: 'website',
  },
  alternates: {
    languages: {
      ko: 'https://www.manda.io.kr/',
    },
  },
  verification: {
    google: 'hqmxMlStpr94SZheqeOeogRi431jztKqSDx2frEtdqU',
  },
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
          <div className='flex h-full flex-1 items-center justify-center'>
            <Alert />
            <div className='h-full w-full'>
              <ErrorBoundaryWrapper>
                <TQProvider>{children}</TQProvider>
              </ErrorBoundaryWrapper>
            </div>
          </div>
        </main>
        <footer className='w-full border-t border-gray-lightgray bg-white-light py-8'>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
