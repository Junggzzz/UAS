'use client';

import Header from '@/components/Header';
import ProductAll from '@/components/ProductAll';
import Pagination from '@/components/pagination';

export default function ShopPage() {
  return (
    <main className="font-poppins bg-white">
      <Header />

      {/* HERO SECTION */}
<div className="relative w-full h-[316px] bg-[#B88E2F] flex flex-col justify-center items-center text-white overflow-hidden">
  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320">
    <path
      fill="#D9A55C"
      fillOpacity="1"
      d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,96C672,75,768,85,864,112C960,139,1056,181,1152,170.7C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>

  {/* Konten Hero */}
  <h1 className="text-4xl md:text-5xl font-bold z-10">Shop</h1>
  <p className="text-sm mt-2 z-10">Home &gt; Shop</p>
</div>



      {/* KONTEN */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
        <ProductAll />
        <Pagination />
      </div>

    </main>
  );
}
