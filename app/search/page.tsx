'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      let request = supabase.from('products').select('*').ilike('name', `%${query}%`)

      if (minPrice) request = request.gte('price', Number(minPrice))
      if (maxPrice) request = request.lte('price', Number(maxPrice))

      const { data, error } = await request
      if (error) console.error('❌ Gagal mencari:', error.message)
      else setResults(data || [])

      setLoading(false)
    }

    const delay = setTimeout(fetchData, 500)
    return () => clearTimeout(delay)
  }, [query, minPrice, maxPrice])

  return (
    <div className="min-h-screen bg-[#F9F1E7] py-10 px-4 font-poppins text-black">
      <div className="max-w-5xl mx-auto text-center">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-[#B88E2F] text-white text-sm rounded hover:bg-yellow-700 transition"
        >
          ← Kembali
        </button>

        <h1 className="text-3xl font-bold text-[#B88E2F] mb-4">Pencarian Produk</h1>
        <p className="text-gray-700 mb-8">Temukan produk yang kamu inginkan</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded text-black bg-white"
          />
          <input
            type="number"
            placeholder="Min Harga"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full sm:w-1/4 p-3 border border-gray-300 rounded text-black bg-white"
          />
          <input
            type="number"
            placeholder="Max Harga"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full sm:w-1/4 p-3 border border-gray-300 rounded text-black bg-white"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 mt-4">Mencari produk...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => router.push(`/products/${p.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-4"
            >
              <div className="relative aspect-[4/5] w-full rounded overflow-hidden mb-3">
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
              <p className="mt-1 font-bold text-[#B88E2F]">{formatPrice(p.price)}</p>
            </div>
          ))}
        </div>
      ) : query.length >= 2 ? (
        <p className="text-center text-gray-500 mt-6">Tidak ada produk ditemukan.</p>
      ) : (
        <p className="text-center text-gray-400 mt-6">Masukkan minimal 2 huruf untuk mencari.</p>
      )}
    </div>
  )
}