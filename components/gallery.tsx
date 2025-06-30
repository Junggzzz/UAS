'use client';

import Masonry from 'react-masonry-css';
import Image from 'next/image';
import '../app/styles.css';

const images = [
  '/gallery/1.png',
  '/gallery/2.png',
  '/gallery/3.png',
  '/gallery/4.png',
  '/gallery/5.png',
  '/gallery/6.png',
  '/gallery/7.png',
  '/gallery/8.png',
  '/gallery/9.png',
];

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Gallery() {
  return (
    <div className="px-4 py-8 bg-white font-poppins">
      <h2 className="text-center text-xl md:text-xl font-semibold mb-6 text-black">
        Share your setup with <br />
        <span className="text-2xl md:text-4xl font-bold text-black-800">#FurniroFurniture</span>
      </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((src, i) => (
          <div key={i}>
            <Image
              src={src}
              alt={`Funiro setup ${i}`}
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
