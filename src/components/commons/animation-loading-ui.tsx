'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const seedImages = [
  '/images/loading/seed1.svg',
  '/images/loading/seed2.svg',
  '/images/loading/seed3.svg',
];
const flowerImages = [
  '/images/loading/flower1.svg',
  '/images/loading/flower2.svg',
  '/images/loading/flower3.svg',
];
const sproutImages = [
  '/images/loading/sprout1.svg',
  '/images/loading/sprout2.svg',
  '/images/loading/sprout3.svg',
];

const imageGroups = [seedImages, flowerImages, sproutImages];

const AnimationLoading = () => {
  const [current, setCurrent] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // 컴포넌트가 처음 마운트될 때 랜덤 선택
  useEffect(() => {
    const randomGroup =
      imageGroups[Math.floor(Math.random() * imageGroups.length)];
    setSelectedImages(randomGroup);
  }, []);

  // 이미지 인덱스 순환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % selectedImages.length);
    }, 500);
    return () => clearInterval(timer);
  }, [selectedImages]);

  // 이미지가 준비되지 않았다면 null 반환
  if (selectedImages.length === 0) {
    return null;
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='relative flex h-full w-full items-center justify-center'>
        {selectedImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`로딩 이미지${index + 1}`}
            width={300}
            height={300}
            className={`absolute transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimationLoading;
