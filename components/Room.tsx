'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const slides = [
  { image: '/room/room1.png', title: 'Inner Peace', desc: '01 — Bed Room' },
  { image: '/room/room2.png', title: 'Bright Dining', desc: '02 — Dining Room' },
  { image: '/room/room3.png', title: 'Cozy Corner', desc: '03 — Living Room' },
];

export default function RoomSlider() {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % slides.length);

  return (
    <section className="bg-[#fcf8f4] py-16 px-6 md:px-20 font-poppins">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-black leading-tight">
            50+ Beautiful rooms<br />inspiration
          </h2>
          <p className="text-gray-600 max-w-xs">
            Our designer already made a lot of beautiful prototype of rooms that inspire you
          </p>
          <button className="bg-[#B88E2F] hover:bg-[#a77d25] text-white px-6 py-2 transition-colors duration-300">
            Explore More
          </button>
        </div>

        {/* Main Image */}
        <div className="relative h-[420px]">
          <Image
            src={slides[i].image}
            alt={slides[i].title}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-3 w-[80%] md:w-[280px] shadow-md rounded">
            <p className="text-sm text-gray-500 mb-1">{slides[i].desc}</p>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-black text-lg">{slides[i].title}</h3>
              <button className="bg-[#B88E2F] hover:bg-[#a77d25] text-white p-2 rounded-sm">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail + Nav + Dots */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-[420px] w-full rounded-lg overflow-hidden">
            <Image
              src={slides[(i + 1) % slides.length].image}
              alt={slides[(i + 1) % slides.length].title}
              fill
              className="object-cover"
            />
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  idx === i ? 'bg-[#B88E2F]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
