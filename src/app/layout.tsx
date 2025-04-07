import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko-kr' className='h-full w-full'>
      <body
        className={`${pretendard.variable} flex h-full w-full flex-col antialiased`}
      >
        <header className='fixed left-0 right-0 top-0 z-50 h-[60px]'>
          {/* <Header /> 컴포넌트가 들어올 예정입니다. */}
          <div className='flex h-full gap-20 border-2'>헤더</div>
        </header>
        <main className='mt-[60px] flex-grow'>
          <div className='flex h-full w-full items-center justify-center'>
            {/* children에 메인 영역이 위치합니다. 중앙 70%의 영역만 차지합니다 */}
            <div className='h-full w-[70%]'>{children}</div>
          </div>
        </main>
        <footer>
          푸터
          {/* <Footer /> 컴포넌트가 들어올 예정입니다. */}
        </footer>
      </body>
    </html>
  );
}
