import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import TQProvider from '@/providers/tq-provider';

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
    <html lang='ko-KR'>
      <body className={`${pretendard.variable} antialiased`}>
        <TQProvider>{children}</TQProvider>
      </body>
    </html>
  );
}
