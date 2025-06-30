'use client'

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F1E7] text-black p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Pembayaran Berhasil!</h1>
        <p className="text-lg mb-6">Terima kasih sudah berbelanja. Pesanan kamu sedang kami proses.</p>
        <Link
          href="/"
          className="inline-block bg-[#B88E2F] hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}