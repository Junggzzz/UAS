'use client'

import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '@/components/footer'
import FooterCopyright from '@/components/footercopyright'

export default function About() {
  const router = useRouter()

  return (
    <>
      <Header />

      {/* Hero Section ala Shop */}
      <section className="relative h-60 md:h-72 bg-[#B88E2F] text-white flex items-center justify-center font-poppins overflow-hidden">
        <div className="absolute inset-0 bg-[#D4A762] rounded-b-[100px] md:rounded-b-[150px] -top-6 z-0"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Tentang Kami</h1>
          <p className="text-sm mt-2">Home &gt; About</p>
        </div>
      </section>

      {/* Konten Tentang Kami */}
      <section className="bg-[#F9F1E7] flex flex-col items-center justify-center pt-12 pb-20 px-4 text-black font-poppins">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Kami adalah platform jual beli furniture yang dirancang untuk memberikan kemudahan, kenyamanan, dan kepuasan dalam berbelanja kebutuhan rumah Anda.
            Mulai dari kursi, meja, sofa, lemari, hingga dekorasi interior — semua tersedia dengan kualitas terbaik dan harga yang kompetitif.
          </p>

          <p className="text-gray-700 text-base mb-4 leading-relaxed">
            Melalui tampilan yang modern dan antarmuka yang intuitif, kami menghadirkan pengalaman belanja online yang efisien.
            Pengguna dapat dengan mudah menelusuri produk, menambahkan ke keranjang, menyimpan ke wishlist, dan menyelesaikan transaksi dengan aman.
          </p>

          <p className="text-gray-600 text-sm mb-8">
            Website ini dibangun menggunakan teknologi modern seperti <strong>Next.js</strong>, <strong>Supabase</strong>, dan <strong>Tailwind CSS</strong>
            untuk memastikan performa yang cepat, tampilan responsif di berbagai perangkat, serta kemudahan pengelolaan data secara real-time.
          </p>

          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#B88E2F] text-white rounded font-semibold hover:bg-yellow-700 transition"
          >
            ← Kembali
          </button>
        </div>
      </section>
      <Footer />
      <FooterCopyright />
    </>
  )
}
