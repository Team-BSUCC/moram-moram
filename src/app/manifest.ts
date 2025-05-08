import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manda',
    short_name: 'Manda',
    description:
      '오타니 쇼헤이가 목표를 이루기 위해 제작한 만다라트 표를 간단히 제작하고, 공통 목표를 친구와 실시간으로 편집해 보세요!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#D6BAEC',
    icons: [
      {
        src: '/images/icons/icon-203.png',
        sizes: '203x203',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
